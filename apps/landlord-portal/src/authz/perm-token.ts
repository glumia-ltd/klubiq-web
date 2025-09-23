// src/authz/readPermCookie.ts
import { jwtDecode } from 'jwt-decode';

type PermPayload = {
  orgUuid: string;
  role: string;
  permissions: string[]; // ["Property:Read", ...]
  version: string;     // policy version
  sub: string;     // user id
  iat: number;
  exp: number;
};

function getCookie(name: string): string | null {
  const m = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&') + '=([^;]*)'),
  );
  return m ? decodeURIComponent(m[1] ?? '') : null;
}

/** Returns decoded payload or null if cookie missing/invalid/expired */
export function readPermCookie(cookieName = '_kbq_pt'): (PermPayload & { set: Set<string> }) | null {
  const raw = getCookie(cookieName);

  if (!raw) return null;
  try {
    const payload = jwtDecode<PermPayload>(raw);
    // basic staleness guard
    if (typeof payload.exp === 'number' && Date.now() / 1000 >= payload.exp) return null;
    return { ...payload, set: new Set(payload.permissions ?? []) };
  } catch {
    return null;
  }
}
