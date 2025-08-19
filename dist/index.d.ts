import { SDKConfig, SimulationResponse, CallTrace, Events } from './types';
export declare const BASE_URL = "https://hypurrstudio.onrender.com";
export declare class TxStudioSDK {
    private client;
    constructor(config: SDKConfig);
    /**
     * Validates an Ethereum address
     * @param address The address to validate
     * @throws {ValidationError} If the address is invalid
     */
    private validateAddress;
    /**
     * Simulates an Ethereum transaction
     * @param params The transaction parameters
     * @returns The simulation results
     */
    simulateTransaction(params: Record<string, unknown>): Promise<SimulationResponse>;
    /**
     * Gets the trace of a simulated transaction
     * @param txHash The transaction hash
     * @returns The transaction trace
     */
    getTransactionTrace(txHash: string): Promise<CallTrace[]>;
    /**
     * Gets the logs from a simulated transaction
     * @param txHash The transaction hash
     * @returns The transaction logs
     */
    getTransactionLogs(txHash: string): Promise<Events[]>;
}
