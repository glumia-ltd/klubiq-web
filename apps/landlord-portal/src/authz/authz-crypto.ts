// src/crypto/authz-crypto.ts
const te = new TextEncoder();
const td = new TextDecoder();

const b64e = (buf: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}
const b64d = (b64: string) => {
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

const deriveKeyPBKDF2 = async (secret: string, salt: ArrayBuffer): Promise<CryptoKey> => {
  const baseKey = await crypto.subtle.importKey('raw', te.encode(secret), { name: 'PBKDF2' }, false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 150_000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

const encryptJSON = async (
  payload: unknown,
  secretMaterial: string,
  saltB64?: string,
): Promise<{ v: 1; iv: string; salt: string; ct: string }> => {
  const salt = saltB64 ? b64d(saltB64) : crypto.getRandomValues(new Uint8Array(16)).buffer;
  const iv = crypto.getRandomValues(new Uint8Array(12)).buffer;
  const key = await deriveKeyPBKDF2(secretMaterial, salt);
  const pt = te.encode(JSON.stringify(payload));
  const ctBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, pt);
  return { v: 1, iv: b64e(iv), salt: b64e(salt), ct: b64e(ctBuf) };
}

const decryptJSON = async <T>(
  blob: { v: 1; iv: string; salt: string; ct: string },
  secretMaterial: string,
): Promise<T | undefined> => {
  try {
    const key = await deriveKeyPBKDF2(secretMaterial, b64d(blob.salt));
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64d(blob.iv) }, key, b64d(blob.ct));
    return JSON.parse(td.decode(pt)) as T;
  } catch { return undefined; }
}
