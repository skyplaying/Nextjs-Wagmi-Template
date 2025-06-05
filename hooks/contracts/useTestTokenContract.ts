import {
  useChainId,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getTestTokenContract } from "@/utils/contractHelpers";
import { Abi, Address } from "viem";

// read example
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

// write example
export const useMintTestToken = () => {
  const chainId = useChainId();
  const contract = getTestTokenContract(chainId);
  const {
    data: hash,
    isPending,
    writeContractAsync,
    error,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const write = async (address: Address, amount: bigint) => {
    return await writeContractAsync({
      ...contract,
      functionName: "mint",
      args: [address, amount],
    });
  };
  return {
    isPending,
    hash,
    writeContract: write,
    error,
    isConfirming,
    isConfirmed,
  };
};
