"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxStudioSDK = exports.BASE_URL = void 0;
const ethers_1 = require("ethers");
const client_1 = require("./http/client");
const errors_1 = require("./errors");
exports.BASE_URL = 'https://hypurrstudio.onrender.com';
class TxStudioSDK {
    constructor(config) {
        this.client = new client_1.HttpClient(config);
    }
    /**
     * Validates an Ethereum address
     * @param address The address to validate
     * @throws {ValidationError} If the address is invalid
     */
    validateAddress(address) {
        if (!(0, ethers_1.isAddress)(address)) {
            throw new errors_1.ValidationError(`Invalid Ethereum address: ${address}`);
        }
    }
    /**
     * Simulates an Ethereum transaction
     * @param params The transaction parameters
     * @returns The simulation results
     */
    async simulateTransaction(params) {
        if (typeof params.from === 'string')
            this.validateAddress(params.from);
        if (typeof params.to === 'string')
            this.validateAddress(params.to);
        if (typeof params.input === 'string' && !params.input.startsWith('0x')) {
            throw new errors_1.ValidationError('Transaction input must be hex-encoded with 0x prefix');
        }
        return this.client.post('/simulate', params);
    }
    /**
     * Gets the trace of a simulated transaction
     * @param txHash The transaction hash
     * @returns The transaction trace
     */
    async getTransactionTrace(txHash) {
        if (!txHash.startsWith('0x') || txHash.length !== 66) {
            throw new errors_1.ValidationError('Invalid transaction hash format');
        }
        return this.client.get(`/trace/${txHash}`);
    }
    /**
     * Gets the logs from a simulated transaction
     * @param txHash The transaction hash
     * @returns The transaction logs
     */
    async getTransactionLogs(txHash) {
        if (!txHash.startsWith('0x') || txHash.length !== 66) {
            throw new errors_1.ValidationError('Invalid transaction hash format');
        }
        return this.client.get(`/logs/${txHash}`);
    }
}
exports.TxStudioSDK = TxStudioSDK;
//# sourceMappingURL=index.js.map