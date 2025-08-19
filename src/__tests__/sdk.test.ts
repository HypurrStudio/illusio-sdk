import { IllusioSDK } from '../index';
import { SimulationRequest, SimulationResponse } from '../types';
import { ValidationError } from '../errors';

describe('IllusioSDK', () => {
  let sdk: IllusioSDK;

  beforeEach(() => {
    sdk = new IllusioSDK({});
  });

  describe('simulateTransaction', () => {
    it('should validate from address correctly', async () => {
      const invalidRequest: SimulationRequest = {
        from: 'invalid-address',
        to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        value: '0x0',
      };

      await expect(sdk.simulateTransaction(invalidRequest)).rejects.toThrow(
        ValidationError
      );
    });

    it('should validate to address correctly', async () => {
      const invalidRequest: SimulationRequest = {
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: 'invalid-address',
        value: '0x0',
      };

      await expect(sdk.simulateTransaction(invalidRequest)).rejects.toThrow(
        ValidationError
      );
    });

    it('should validate transaction input format', async () => {
      const invalidRequest: SimulationRequest = {
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        input: 'invalid-input', // Missing 0x prefix
      };

      await expect(sdk.simulateTransaction(invalidRequest)).rejects.toThrow(
        ValidationError
      );
    });

    it('should allow optional from/to addresses', async () => {
      const validRequest: SimulationRequest = {
        input: '0x',
        value: '0x0',
      };

      // This should not throw validation error
      await expect(sdk.simulateTransaction(validRequest)).resolves.toBeDefined();
    });

    it('should validate state objects addresses', async () => {
      const invalidRequest: SimulationRequest = {
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        stateObjects: {
          'invalid-address': {
            balance: '0x0',
            storage: {}
          }
        }
      };

      await expect(sdk.simulateTransaction(invalidRequest)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe('getTransactionTrace', () => {
    it('should validate transaction hash format', async () => {
      await expect(sdk.getTransactionTrace('invalid-hash')).rejects.toThrow(
        ValidationError
      );
    });

    it('should accept valid transaction hash', async () => {
      const validHash = '0x' + '1'.repeat(64);
      await expect(sdk.getTransactionTrace(validHash)).resolves.toBeDefined();
    });
  });

  describe('getTransactionLogs', () => {
    it('should validate transaction hash format', async () => {
      await expect(sdk.getTransactionLogs('invalid-hash')).rejects.toThrow(
        ValidationError
      );
    });

    it('should accept valid transaction hash', async () => {
      const validHash = '0x' + '1'.repeat(64);
      await expect(sdk.getTransactionLogs(validHash)).resolves.toBeDefined();
    });
  });
});
