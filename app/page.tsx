"use client";

import { AppKit } from "@/config/connectors/appkitModal";

export default function Home() {
  return (
    <div>
      <button onClick={() => AppKit.open()}>Open Modal</button>
    </div>
  );
}
