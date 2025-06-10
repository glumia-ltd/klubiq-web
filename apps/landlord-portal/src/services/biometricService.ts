import { Buffer } from 'buffer';

interface RegisterCredentialRequest {
  credential: PublicKeyCredential;
  email: string;
}

interface VerifyCredentialRequest {
  assertion: PublicKeyCredential;
  email: string;
}

export class BiometricService {
  private static baseUrl = import.meta.env.VITE_BASE_URL_DEV || 'https://api.klubiq.com';

  private static async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to process biometric request');
    }

    return response.json();
  }

  public static async getRegistrationOptions(email: string) {
    return this.fetchWithAuth('/auth/biometric/register-options', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  public static async registerCredential(data: RegisterCredentialRequest) {
    const credentialData = {
      id: data.credential.id,
      rawId: Buffer.from(data.credential.rawId).toString('base64'),
      response: {
        attestationObject: Buffer.from(
          (data.credential.response as AuthenticatorAttestationResponse).attestationObject
        ).toString('base64'),
        clientDataJSON: Buffer.from(
          (data.credential.response as AuthenticatorAttestationResponse).clientDataJSON
        ).toString('base64'),
      },
      type: data.credential.type,
      email: data.email,
    };

    return this.fetchWithAuth('/auth/biometric/register', {
      method: 'POST',
      body: JSON.stringify(credentialData),
    });
  }

  public static async getAssertionOptions(email: string) {
    return this.fetchWithAuth('/auth/biometric/assert-options', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  public static async verifyCredential(data: VerifyCredentialRequest) {
    const assertionData = {
      id: data.assertion.id,
      rawId: Buffer.from(data.assertion.rawId).toString('base64'),
      response: {
        authenticatorData: Buffer.from(
          (data.assertion.response as AuthenticatorAssertionResponse).authenticatorData
        ).toString('base64'),
        clientDataJSON: Buffer.from(
          (data.assertion.response as AuthenticatorAssertionResponse).clientDataJSON
        ).toString('base64'),
        signature: Buffer.from(
          (data.assertion.response as AuthenticatorAssertionResponse).signature
        ).toString('base64'),
        userHandle: (data.assertion.response as AuthenticatorAssertionResponse).userHandle
          ? Buffer.from(new Uint8Array((data.assertion.response as AuthenticatorAssertionResponse).userHandle!)).toString('base64')
          : undefined,
      },
      type: data.assertion.type,
      email: data.email,
    };

    return this.fetchWithAuth('/auth/biometric/verify', {
      method: 'POST',
      body: JSON.stringify(assertionData),
    });
  }

  public static async revokeCredential(email: string) {
    return this.fetchWithAuth('/auth/biometric/revoke', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
} 