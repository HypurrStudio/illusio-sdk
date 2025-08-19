import axios, { AxiosInstance, AxiosError } from 'axios';
import { SDKConfig } from '../types';
import {
  SDKError,
  NetworkError,
  AuthenticationError,
  RateLimitError,
} from '../errors';
import { BASE_URL } from '../index';

export class HttpClient {
  private client: AxiosInstance;
  private retries: number;

  constructor(config: SDKConfig) {
    this.retries = config.retries || 3;
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      this.handleError.bind(this)
    );
  }

  private async handleError(error: AxiosError): Promise<never> {
    if (!error.response) {
      throw new NetworkError('Network error occurred', error);
    }

    const status = error.response.status;
    const data = error.response.data as { message?: string; details?: unknown };

    switch (status) {
      case 401:
        throw new AuthenticationError(data.message);
      case 429:
        throw new RateLimitError(data.message);
      default:
        throw new SDKError(
          data.message || 'An unexpected error occurred',
          'API_ERROR',
          status,
          data.details
        );
    }
  }

  public async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get(path, { params });
    return response.data;
  }

  public async post<T, D = Record<string, unknown>>(
    path: string,
    data?: D
  ): Promise<T> {
    const response = await this.client.post(path, data);
    return response.data;
  }

  public async put<T>(
    path: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    const response = await this.client.put(path, data);
    return response.data;
  }

  public async delete<T>(path: string): Promise<T> {
    const response = await this.client.delete(path);
    return response.data;
  }
}
