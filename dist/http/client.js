"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("../errors");
const index_1 = require("../index");
class HttpClient {
    constructor(config) {
        this.retries = config.retries || 3;
        this.client = axios_1.default.create({
            baseURL: index_1.BASE_URL,
            timeout: config.timeout || 30000,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // Add response interceptor for error handling
        this.client.interceptors.response.use((response) => response, this.handleError.bind(this));
    }
    async handleError(error) {
        if (!error.response) {
            throw new errors_1.NetworkError('Network error occurred', error);
        }
        const status = error.response.status;
        const data = error.response.data;
        switch (status) {
            case 401:
                throw new errors_1.AuthenticationError(data.message);
            case 429:
                throw new errors_1.RateLimitError(data.message);
            default:
                throw new errors_1.SDKError(data.message || 'An unexpected error occurred', 'API_ERROR', status, data.details);
        }
    }
    async get(path, params) {
        const response = await this.client.get(path, { params });
        return response.data;
    }
    async post(path, data) {
        const response = await this.client.post(path, data);
        return response.data;
    }
    async put(path, data) {
        const response = await this.client.put(path, data);
        return response.data;
    }
    async delete(path) {
        const response = await this.client.delete(path);
        return response.data;
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=client.js.map