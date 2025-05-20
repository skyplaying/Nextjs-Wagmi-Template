import { getDefaultConfig, WalletList } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import {  mainnet, sepolia } from "wagmi/chains";
import { metaMaskWallet, okxWallet } from "@rainbow-me/rainbowkit/wallets";


const wallets: WalletList = [
  {
    groupName: "Wallets",
    wallets: [okxWallet, metaMaskWallet],
  },
]
const chains = [mainnet, sepolia] as const;

const metadata = {
  name: "Nextjs Wagmi Quickstart",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
}
const config = getDefaultConfig({
    appName: metadata.name,
    projectId: metadata.projectId,
    chains,
    transports: {
        [chains[0].id]: http(),
        [chains[1].id]: http(),
    },
    ssr: true,
    wallets,
});

export const wagmiConfig = config;

export const defaultNetwork = chains[1];