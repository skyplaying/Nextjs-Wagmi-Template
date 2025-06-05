import { sepolia } from "wagmi/chains";

export const ContractAddresses: Record<
  string,
  Record<number, `0x${string}` | "">
> = {
  TestToken: {
    [sepolia.id]: "0xD63991Cd3769fE47Ae832752F40F526E1764d57f",
    // add more chains
    // [mainnet.id]: "0x0000000000000000000000000000000000000000",
  },
} as const;
