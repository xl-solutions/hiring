class AppError {
  public statusCode: number;
  public message: string;

  constructor(message = '', statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
