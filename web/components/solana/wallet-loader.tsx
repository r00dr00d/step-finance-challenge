'use client';

import { ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function WalletLoader({ children }: { children: ReactNode }) {
  const { connected, wallet } = useWallet()

  if (!wallet) {
    return <div>Wallet not connected</div>
  }
  
  if (!connected) {
    return <div>Loading wallet....</div>
  }

  return children
}