import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./Provider";
import { headers } from "next/headers";
export const metadata: Metadata = {
  title: "Next.js Wagmi Quickstart",
  description: "Quickstart for Next.js, Wagmi and Reown AppKit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}

export async function BaseLayout({ children }: { children: React.ReactNode }) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");
  return <Provider cookies={cookies}>{children}</Provider>;
}
