import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";
export const metadata: Metadata = {
  title: "Next.js Wagmi Quickstart",
  description: "Quickstart for Next.js, Wagmi and RainbowKit",
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
  return <Provider>{children}</Provider>;
}
