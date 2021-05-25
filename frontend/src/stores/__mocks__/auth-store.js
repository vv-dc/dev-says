const MockAuthStore = {
  setAuthData: jest.fn(),
  resetAuthData: jest.fn(),
  setUserProfile: jest.fn(),
};

Object.defineProperties(MockAuthStore, {
  accessToken: { get: jest.fn(), configurable: true },
  expiresAt: { get: jest.fn(), configurable: true },
  userId: { get: jest.fn(), configurable: true },
  user: { get: jest.fn(), configurable: true },
});

export default MockAuthStore;
