export class SDKError extends Error {
  public readonly code: string;
  public readonly httpStatus?: number;
  public readonly details?: unknown;

  constructor(message: string, code: string, httpStatus?: number, details?: unknown) {
    super(message);
    this.name = 'SDKError';
    this.code = code;
    this.httpStatus = httpStatus;
    this.details = details;
  }
}

export class ValidationError extends SDKError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends SDKError {
  constructor(message: string, details?: unknown) {
    super(message, 'NETWORK_ERROR', 503, details);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends SDKError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends SDKError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 'RATE_LIMIT_ERROR', 429);
    this.name = 'RateLimitError';
  }
}
