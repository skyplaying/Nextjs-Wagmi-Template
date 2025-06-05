import { getTestTokenAddress } from "./addresstHelpers";
import TestToken_ABI from "@/config/contracts/abi/TestToken.json";

export const getTestTokenContract = (chainId: number) => {
  const address = getTestTokenAddress(chainId);
  return {
    address,
    abi: TestToken_ABI,
  };
};
