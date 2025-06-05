import { sepolia } from "wagmi/chains";

export const ContractAddresses: Record<
  string,
  Record<number, `0x${string}` | "">
> = {
  TestToken: {
    [sepolia.id]: "0x2D0a6F1C3f427F5414a80Cfee844D7293ec8E668",
    // add more chains
    // [mainnet.id]: "0x59Cc3D82cfaEEe271E32Fbe812a103437DD91132",
  },
} as const;
