export interface SimulationRequest extends Record<string, unknown> {
    from?: string;
    to?: string;
    input?: string;
    value?: string;
    gas?: string;
    gasPrice?: string;
    stateObjects?: {
        [address: string]: {
            balance: string;
            storage: {
                [slot: string]: string;
            };
        };
    };
    generateAccessList?: boolean;
    blockHeader?: {
        number: string;
        timestamp: string;
    };
    blockNumber?: number | string;
    transactionIndex?: number;
    accessList?: {
        address: string;
        storageKeys: string[];
    }[];
    [key: string]: unknown;
}
export interface SimulationResponse {
    transaction: TransactionObject;
    generated_access_list: GeneratedAccessList[];
    contracts: ContractObjectResponse;
}
export interface ContractObjectResponse {
    [address: string]: ContractObject;
}
export interface TransactionObject {
    from: string;
    to: string;
    input: string;
    value: string;
    gas: string;
    gasPrice: string;
    output: string;
    timestamp: string;
    blockHeader: {
        number: string;
        hash: string;
        baseFeePerGas: string;
        blobGasUsed: string;
        difficulty: string;
        excessBlobGas: string;
        extraData: string;
        gasLimit: string;
        gasUsed: string;
        logsBloom: string;
        miner: string;
        nonce: string;
        size: string;
        stateRoot: string;
        timestamp: string;
    };
    callTrace: CallTrace[];
    balanceDiff: BalanceDiff;
    storageDiff: StorageDiff;
    events: Events[];
}
export interface GeneratedAccessList {
    address: string;
    storageKeys: string[];
}
export interface ContractObject {
    address: string;
    SourceCode: string;
    ABI: string;
    ContractName: string;
    CompilerVersion: string;
    CompilerType: string;
    OptimizationUsed: boolean;
    Runs: string;
    ConstructorArguments: string;
    EVMVersion: string;
    Library: string;
    ContractFileName: string;
    LicenseType: string;
    Proxy: string;
    Implementation: string;
    SwarmSource: string;
    SimilarMatch: string;
}
export interface CallTrace {
    from: string;
    to: string;
    gas: string;
    gasUsed: string;
    input: string;
    output: string;
    type: string;
    calls?: CallTrace[];
}
export interface BalanceDiff {
    [address: string]: {
        before: string;
        after: string;
    };
}
export interface StorageDiff {
    [address: string]: {
        [slot: string]: {
            before: string;
            after: string;
        };
    };
}
export interface Events {
    address: string;
    topics: string[];
    data: string;
    blockNumber: string;
    transactionHash: string;
    transactionIndex: string;
    blockHash: string;
    logIndex: string;
    removed: boolean;
}
export interface SDKConfig {
    timeout?: number;
    retries?: number;
}
export interface APIErrorResponse {
    code: number;
    message: string;
    details?: unknown;
}
