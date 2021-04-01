const tokenMockup = {
  accessToken: 'sometokenhere',
};

export async function refreshToken() {
  return Promise.resolve(tokenMockup);
}

// eslint-disable-next-line no-unused-vars
export async function loginUser(login, password) {
  return Promise.resolve(tokenMockup);
}
