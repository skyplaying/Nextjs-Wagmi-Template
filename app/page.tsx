"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadTestTokenContract } from "@/hooks/contracts/useTestTokenContract";
import { useAccount } from "wagmi";
import { useMintTestToken } from "@/hooks/contracts/useTestTokenContract";

export default function Home() {
  const { address } = useAccount();
  const {
    data,
    isLoading,
    refetch: refetchTestToken,
  } = useReadTestTokenContract(address);
  const {
    hash,
    writeContract: mintTestToken,
    isPending,
    isConfirmed,
    errorMessage,
    isError,
  } = useMintTestToken();

  const handleMint = async () => {
    if (!address) return;
    const { receipt, isConfirmed } = await mintTestToken(address, BigInt(1000));
    if (isConfirmed) {
      console.log("mint success", receipt);
      refetchTestToken();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <ConnectButton />
        </div>

        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500">Error</p>
          ) : (
            <div className="text-center">
              <p>
                Balance: {data?.balanceOfAddress?.toString()}
                <br />
                Decimals: {data?.decimals?.toString()}
                <br />
                Name: {data?.name?.toString()}
                <br />
                Symbol: {data?.symbol?.toString()}
                <br />
                Total Supply: {data?.totalSupply?.toString()}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mt-6 gap-4">
          <button
            onClick={() => refetchTestToken()}
            className="bg-blue-500 text-white p-2 rounded hover:cursor-pointer hover:bg-blue-600 w-full max-w-[200px]"
          >
            Refetch
          </button>

          <button
            onClick={handleMint}
            className="bg-blue-500 text-white p-2 rounded hover:cursor-pointer hover:bg-blue-600 w-full max-w-[200px]"
          >
            {isPending ? "Minting..." : "Mint"}
          </button>
        </div>

        <div className="mt-4 text-center">
          {isPending && <p className="text-yellow-500">Confirming...</p>}
          {isConfirmed && <p className="text-green-500">Confirmed</p>}
          {isError && (
            <p className="text-red-500">Execution Error: {errorMessage}</p>
          )}
          {hash && <p className="break-all text-sm mt-2">Hash: {hash}</p>}
        </div>
      </div>
    </div>
  );
}
