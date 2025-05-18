export const authEndpoints = {
  login: () => '/auth/signin',
  // signup: () => '/auth/landlord/signup',
  // signOut: () => '/auth/signout',
  // emailVerification: () => '/auth/email-verification-link',
  // refreshToken: () => '/auth/exchange-refresh-token',
  // getUserByFbid: () => `/auth/user`,
  // sendResetPasswordEmail: () => `/auth/reset-password-link`,
  // resetPassword: () => `/auth/reset-password`,
  // verifyOobCode: () => `/auth/verify-email`,
  // updateUserPreferences: () => `/auth/update-preferences`,
  // getOrgSettings: (orgId: string) => `/auth/org/${orgId}/settings`,
  // getOrgSubscription: (orgId: string) => `/auth/org/${orgId}/subscription`,
  // firebaseAuth: () => 'https://identitytoolkit.googleapis.com/v1/accounts',
  acceptInvitation: (token: string) => `/auth/accept-tenant-invitation?token=${token}`
};