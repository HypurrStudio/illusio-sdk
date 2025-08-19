import { isAddress } from 'ethers';
import { HttpClient } from './http/client';
import {
  SDKConfig,
  SimulationRequest,
  SimulationResponse,
  CallTrace,
  Events,
} from './types';
import { ValidationError } from './errors';

export const BASE_URL = 'https://hypurrstudio.onrender.com';

export class TxStudioSDK {
  private client: HttpClient;

  constructor(config: SDKConfig) {
    this.client = new HttpClient(config);
  }

  /**
   * Validates an Ethereum address
   * @param address The address to validate
   * @throws {ValidationError} If the address is invalid
   */
  private validateAddress(address: string): void {
    if (!isAddress(address)) {
      throw new ValidationError(`Invalid Ethereum address: ${address}`);
    }
  }

  /**
   * Simulates an Ethereum transaction
   * @param params The transaction parameters
   * @returns The simulation results
   */
  public async simulateTransaction(
    params: Record<string, unknown>
  ): Promise<SimulationResponse> {
    if (typeof params.from === 'string') this.validateAddress(params.from);
    if (typeof params.to === 'string') this.validateAddress(params.to);

    if (typeof params.input === 'string' && !params.input.startsWith('0x')) {
      throw new ValidationError('Transaction input must be hex-encoded with 0x prefix');
    }

    return this.client.post<SimulationResponse, SimulationRequest>('/simulate', params);
  }

  /**
   * Gets the trace of a simulated transaction
   * @param txHash The transaction hash
   * @returns The transaction trace
   */
  public async getTransactionTrace(txHash: string): Promise<CallTrace[]> {
    if (!txHash.startsWith('0x') || txHash.length !== 66) {
      throw new ValidationError('Invalid transaction hash format');
    }

    return this.client.get<CallTrace[]>(`/trace/${txHash}`);
  }

  /**
   * Gets the logs from a simulated transaction
   * @param txHash The transaction hash
   * @returns The transaction logs
   */
  public async getTransactionLogs(txHash: string): Promise<Events[]> {
    if (!txHash.startsWith('0x') || txHash.length !== 66) {
      throw new ValidationError('Invalid transaction hash format');
    }

    return this.client.get<Events[]>(`/logs/${txHash}`);
  }
}
