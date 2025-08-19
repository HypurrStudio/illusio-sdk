"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.AuthenticationError = exports.NetworkError = exports.ValidationError = exports.SDKError = void 0;
class SDKError extends Error {
    constructor(message, code, httpStatus, details) {
        super(message);
        this.name = 'SDKError';
        this.code = code;
        this.httpStatus = httpStatus;
        this.details = details;
    }
}
exports.SDKError = SDKError;
class ValidationError extends SDKError {
    constructor(message, details) {
        super(message, 'VALIDATION_ERROR', 400, details);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class NetworkError extends SDKError {
    constructor(message, details) {
        super(message, 'NETWORK_ERROR', 503, details);
        this.name = 'NetworkError';
    }
}
exports.NetworkError = NetworkError;
class AuthenticationError extends SDKError {
    constructor(message = 'Authentication failed') {
        super(message, 'AUTHENTICATION_ERROR', 401);
        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;
class RateLimitError extends SDKError {
    constructor(message = 'Rate limit exceeded') {
        super(message, 'RATE_LIMIT_ERROR', 429);
        this.name = 'RateLimitError';
    }
}
exports.RateLimitError = RateLimitError;
//# sourceMappingURL=index.js.map