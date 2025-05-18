"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { wagmiAdapter } from "@/config/connectors";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export function Provider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
