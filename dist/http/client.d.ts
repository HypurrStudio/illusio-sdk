import { SDKConfig } from '../types';
export declare class HttpClient {
    private client;
    private retries;
    constructor(config: SDKConfig);
    private handleError;
    get<T>(path: string, params?: Record<string, unknown>): Promise<T>;
    post<T, D = Record<string, unknown>>(path: string, data?: D): Promise<T>;
    put<T>(path: string, data?: Record<string, unknown>): Promise<T>;
    delete<T>(path: string): Promise<T>;
}
