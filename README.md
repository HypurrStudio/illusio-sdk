# HyperLiquid Transaction Studio SDK

A TypeScript SDK for interacting with the HyperLiquid Transaction Studio API.

## Installation

```bash
npm install @hyperliquid/tx-studio-sdk
# or
yarn add @hyperliquid/tx-studio-sdk
```

## Usage

```typescript
import { TxStudioSDK } from '@hyperliquid/tx-studio-sdk';

// Initialize the SDK
const sdk = new TxStudioSDK({
  timeout: 30000, // Optional: default 30s
  retries: 3     // Optional: default 3
});

// Simulate a transaction
const simulation = await sdk.simulateTransaction({
  from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  input: '0x',
  value: '0x0',
});

// Get transaction trace
const trace = await sdk.getTransactionTrace('0x123...');

// Get transaction logs
const logs = await sdk.getTransactionLogs('0x123...');
```

## Error Handling

The SDK provides detailed error types for different scenarios:

```typescript
try {
  await sdk.simulateTransaction({...});
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation errors
  } else if (error instanceof NetworkError) {
    // Handle network errors
  } else if (error instanceof AuthenticationError) {
    // Handle authentication errors
  } else if (error instanceof RateLimitError) {
    // Handle rate limit errors
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint

# Format code
npm run format
```

## License

MIT
