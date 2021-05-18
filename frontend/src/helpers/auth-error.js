export class AuthError extends Error {
  constructor() {
    super('Authentication is required!');
  }
}
