export declare class SDKError extends Error {
    readonly code: string;
    readonly httpStatus?: number;
    readonly details?: unknown;
    constructor(message: string, code: string, httpStatus?: number, details?: unknown);
}
export declare class ValidationError extends SDKError {
    constructor(message: string, details?: unknown);
}
export declare class NetworkError extends SDKError {
    constructor(message: string, details?: unknown);
}
export declare class AuthenticationError extends SDKError {
    constructor(message?: string);
}
export declare class RateLimitError extends SDKError {
    constructor(message?: string);
}
