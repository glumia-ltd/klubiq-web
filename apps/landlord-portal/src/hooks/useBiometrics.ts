import { useState, useCallback } from 'react';
import { BiometricAuth } from '../utils/biometrics';

interface UseBiometricsReturn {
  isAvailable: boolean;
  isRegistered: boolean;
  isLoading: boolean;
  error: string | null;
  checkAvailability: () => Promise<void>;
  register: (email: string, options?: {
    rpName?: string;
    rpID?: string;
    userID?: string;
    userName?: string;
    userDisplayName?: string;
  }) => Promise<void>;
  authenticate: (email: string) => Promise<void>;
  revoke: (email: string) => Promise<void>;
}

export const useBiometrics = (): UseBiometricsReturn => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAvailability = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const available = await BiometricAuth.isBiometricAvailable();
      setIsAvailable(available);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check biometric availability');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, options = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const success = await BiometricAuth.registerBiometric(email, options);
      setIsRegistered(success);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register biometric');
      setIsRegistered(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const authenticate = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const success = await BiometricAuth.authenticateBiometric(email);
      if (!success) {
        throw new Error('Biometric authentication failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate with biometric');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const revoke = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await BiometricAuth.revokeBiometric(email);
      setIsRegistered(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke biometric');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isAvailable,
    isRegistered,
    isLoading,
    error,
    checkAvailability,
    register,
    authenticate,
    revoke,
  };
}; 