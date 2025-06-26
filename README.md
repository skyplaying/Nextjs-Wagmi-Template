# Next.js Wagmi QuickStart Template

A quick start template integrating Next.js with Wagmi for developing Web3 applications that interact with the Ethereum blockchain. The template provides basic implementations for reading smart contract data and writing transactions.

## Libraries

- ✅ Next.js 14
- ✅ Wagmi v2
- ✅ RainbowKit

## Getting Started and Running locally

Set `NEXT_PUBLIC_PROJECT_ID` in your `.env.local` file. This is a WalletConnect Project ID which you can obtain from [WalletConnect Cloud](https://cloud.reown.com/app).

```bash
echo "NEXT_PUBLIC_PROJECT_ID=your_project_id_here" > .env.local
pnpm install
pnpm dev
```

## Template Structure

```
/
├── app/                    # Next.js app directory
├── config/                 # Configuration files
│   └── contracts/          # Contract-related configurations
│       ├── abi/            # Contract ABIs
│       └── addresses.ts    # Contract addresses
├── hooks/                  # Custom React Hooks
│   └── contracts/          # Contract-related hooks
├── utils/                  # Utility functions
│   ├── addressHelpers.ts   # Address-related utilities
│   └── contractHelpers.ts  # Contract-related utilities
└── ...
```

### Read Contract Example

Used for batch reading multiple functions from the TestToken contract, including balance, decimals, name, symbol, and total supply.

```typescript
export const useReadTestTokenContract = (address?: Address) => {
  const chainId = useChainId();
  const contract = getTestTokenContract(chainId);

  const contracts = [
    {
      ...contract,
      functionName: "balanceOf",
      args: [address],
    },
    {
      ...contract,
      functionName: "decimals",
    },
    {
      ...contract,
      functionName: "name",
    },
    {
      ...contract,
      functionName: "symbol",
    },
    {
      ...contract,
      functionName: "totalSupply",
    },
  ];

  const { data, error, isLoading, isError, refetch } = useReadContracts({
    contracts: contracts.map((contract) => ({
      ...contract,
      abi: contract.abi as Abi,
    })),
    query: {
      enabled: !!address,
    },
  });

  const [
    balanceOfAddress = BigInt(0),
    decimals = 0,
    name = "",
    symbol = "",
    totalSupply = BigInt(0),
  ] = data?.map((d) => d.result) ?? [];

  const res = {
    balanceOfAddress,
    decimals,
    name,
    symbol,
    totalSupply,
  };
  return {
    data: res,
    error,
    isLoading,
    isError,
    refetch,
  };
};

// Usage
const { data, error, isLoading, isError, refetch } =
  useReadTestTokenContract(address);
```

### Write Contract Example

Used for minting TestToken tokens and handling transaction states (pending, confirming, confirmed).

```typescript
export const useMintTestToken = () => {
  const chainId = useChainId();
  const contract = getTestTokenContract(chainId);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const {
    data: hash,
    isPending,
    error: excuteError,
    isError: isExcuteError,
    writeContractAsync,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    error: callError,
    isError: isCallError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const writeContract = async (address: Address, amount: bigint) => {
    setIsConfirmed(false);
    const hash = await writeContractAsync({
      ...contract,
      functionName: "mint",
      args: [address, amount],
    });
    const { receipt, isConfirmed } = await waitForTransactionReceipt(hash);
    return {
      receipt,
      isConfirmed,
    };
  };

  const error = callError || excuteError;
  return {
    isConfirmed,
    writeContract,
    isPending: isConfirming || isPending,
    hash,
    errorMessage:
      (error as BaseError)?.shortMessage || error?.message || "Unknown error",
    isError: isCallError || isExcuteError,
  };
};

// Usage in components
const handleMint = async () => {
  const { receipt, isConfirmed } = await mintTestToken(address, BigInt(1000));
  if (isConfirmed) {
    console.log("mint success", receipt);
    refetchTestToken();
  }
};
```

```
## Adding New Functionality

1. Add contract ABI in `config/contracts/abi/`
2. Add contract addresses in `config/contracts/addresses.ts`
3. Add address getter function in `utils/addressHelpers.ts`
4. Add contract getter function in `utils/contractHelpers.ts`
5. Create custom hook in `hooks/contracts/`
```
