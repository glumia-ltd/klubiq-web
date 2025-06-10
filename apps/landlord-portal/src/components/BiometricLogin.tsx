import React, { useEffect } from 'react';
import { useBiometric } from '../hooks/useBiometric';
import { Button, CircularProgress } from '@mui/material';

interface BiometricLoginProps {
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const BiometricLogin: React.FC<BiometricLoginProps> = ({
  email,
  onSuccess,
  onError,
}) => {
  const {
    isAvailable,
    isRegistered,
    isLoading,
    error,
    checkAvailability,
    register,
    authenticate,
  } = useBiometric();

  useEffect(() => {
    checkAvailability();
  }, [checkAvailability]);

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, [error, onError]);

  const handleRegister = async () => {
    try {
      await register(email);
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to register biometric');
    }
  };

  const handleAuthenticate = async () => {
    try {
      await authenticate(email);
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to authenticate with biometric');
    }
  };

  if (!isAvailable) {
    return null;
  }

  if (isLoading) {
    return (
      <Button
        disabled
        variant="outlined"
        fullWidth
        startIcon={<CircularProgress size={20} />}
      >
        {isRegistered ? 'Authenticating...' : 'Registering...'}
      </Button>
    );
  }

  return (
    <Button
      onClick={isRegistered ? handleAuthenticate : handleRegister}
      variant="outlined"
      fullWidth
    >
      {isRegistered ? 'Login with Biometric' : 'Register Biometric'}
    </Button>
  );
}; 