import { Buffer } from 'buffer';
import { BiometricService } from '../services/biometricService';

interface BiometricOptions {
  rpName?: string;
  rpID?: string;
  userID?: string;
  userName?: string;
  userDisplayName?: string;
}

export class BiometricAuth {
  private static isSupported(): boolean {
    return window.PublicKeyCredential !== undefined;
  }

  public static async isBiometricAvailable(): Promise<boolean> {
    if (!this.isSupported()) {
      return false;
    }

    try {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return available;
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }

  public static async registerBiometric(email: string, options: BiometricOptions = {}): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error('Biometric authentication is not supported on this device');
    }

    try {
      // Get registration options from server
      const registrationOptions = await BiometricService.getRegistrationOptions(email);
      
      // Convert base64 challenge to ArrayBuffer
      const challenge = Buffer.from(registrationOptions.challenge, 'base64');
      
      const publicKeyOptions: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: options.rpName || 'Klubiq',
          id: options.rpID || window.location.hostname,
        },
        user: {
          id: new Uint8Array(Buffer.from(registrationOptions.user.id, 'base64')),
          name: options.userName || email,
          displayName: options.userDisplayName || email,
        },
        pubKeyCredParams: registrationOptions.pubKeyCredParams,
        timeout: registrationOptions.timeout,
        attestation: registrationOptions.attestation,
        authenticatorSelection: registrationOptions.authenticatorSelection,
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions,
      });

      if (credential instanceof PublicKeyCredential) {
        // Send credential to server for verification and storage
        await BiometricService.registerCredential({
          credential,
          email,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error registering biometric:', error);
      throw error;
    }
  }

  public static async authenticateBiometric(email: string): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error('Biometric authentication is not supported on this device');
    }

    try {
      // Get assertion options from server
      const assertionOptions = await BiometricService.getAssertionOptions(email);
      
      // Convert base64 challenge to ArrayBuffer
      const challenge = Buffer.from(assertionOptions.challenge, 'base64');

      const publicKeyOptions: PublicKeyCredentialRequestOptions = {
        challenge,
        rpId: assertionOptions.rpId,
        allowCredentials: assertionOptions.allowCredentials.map((cred: { type: string; id: string; transports?: string[] }) => ({
          type: cred.type,
          id: Buffer.from(cred.id, 'base64'),
          transports: cred.transports,
        })),
        userVerification: assertionOptions.userVerification,
        timeout: assertionOptions.timeout,
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyOptions,
      });

      if (assertion instanceof PublicKeyCredential) {
        // Send assertion to server for verification
        await BiometricService.verifyCredential({
          assertion,
          email,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error authenticating with biometric:', error);
      throw error;
    }
  }

  public static async revokeBiometric(email: string): Promise<void> {
    await BiometricService.revokeCredential(email);
  }
} 