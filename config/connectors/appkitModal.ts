import { createAppKit } from "@reown/appkit";
import { wagmiAdapter } from "./wagmi";
import { projectId, networks, defaultNetwork } from "./wagmi";

if (!projectId) {
  throw new Error("Project ID is not defined");
}
// Set up metadata
const metadata = {
  name: "Next.js Wagmi Quickstart",
  description: "Quickstart for Next.js, Wagmi and Reown AppKit",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Set up the AppKit Modal
export const AppKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
