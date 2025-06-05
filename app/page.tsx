"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadTestTokenContract } from "@/hooks/contracts/useTestTokenContract";
import { useAccount } from "wagmi";
import { useMintTestToken } from "@/hooks/contracts/useTestTokenContract";
import { useEffect } from "react";
export default function Home() {
  const { address } = useAccount();
  const {
    data,
    isLoading,
    isError,
    refetch: refetchTestToken,
  } = useReadTestTokenContract(address);
  const {
    isPending,
    hash,
    writeContract: mintTestToken,
    executionError,
    isConfirming,
    isConfirmed,
    callError,
  } = useMintTestToken();

  const handleMint = () => {
    if (!address) return;
    mintTestToken(address, BigInt(1000));
  };

  useEffect(() => {
    if (isConfirmed) {
      refetchTestToken();
    }
  }, [isConfirmed, refetchTestToken]);
  return (
    <div>
      <ConnectButton />

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error</p>
        ) : (
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
        )}
      </div>
      <button onClick={() => refetchTestToken()}>Refetch</button>
      <br />

      <button onClick={handleMint}>{isPending ? "Minting..." : "Mint"}</button>
      {isConfirming && <p>Confirming...</p>}
      {isConfirmed && <p>Confirmed</p>}
      {executionError && <p>Execution Error: {executionError.message}</p>}
      {hash && <p>Hash: {hash}</p>}
      {callError && <p>Call Error: {callError.message}</p>}
    </div>
  );
}
