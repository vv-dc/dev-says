export class HttpError extends Error {
  constructor(error) {
    super(error.response.data.message);
    this.code = error.response.data.code;
  }
}
