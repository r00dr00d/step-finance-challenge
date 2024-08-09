'use client';

import Image from 'next/image';
import { ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function WalletLoader({ children }: { children: ReactNode }) {
  const { connected, wallet } = useWallet()

  if (!wallet) {
    return <div className="flex flex-col gap-6 w-full h-full items-center justify-center">
      <Image src="/step-disconnected.svg" width={160} height={160} alt="Wallet disconnected" />
      <p className='text-lg text-white'>Connect your wallet to begin</p>
    </div>
  }
  
  if (!connected) {
    return <div>Loading wallet....</div>
  }

  return children
}