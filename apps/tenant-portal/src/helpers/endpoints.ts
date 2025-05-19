export const authEndpoints = {
  login: () => '/auth/signin',
  signOut: () => '/auth/signout',
  refreshToken: () => '/auth/exchange-refresh-token',
  getUserData: () => `/auth/tenant/user`,
  acceptInvitation: (token: string) => `/auth/accept-tenant-invitation?token=${token}`
};