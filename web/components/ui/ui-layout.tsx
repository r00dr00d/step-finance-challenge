'use client';

import { WalletButton } from '@/services/solana/solana-provider';
import * as React from 'react';
import { ReactNode, Suspense } from 'react';

import Link from 'next/link';
import  { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export function UiLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-[#000] text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            <Image width={120} height={10} alt="Logo" src="/logo.svg" />
          </Link>
        </div>
        <div className="flex-none space-x-2">
        <WalletButton className="bg-red-300! text-2xl"  style={{ background: 'red' }}/>
        </div>
      </div>
      <div className="flex-grow mx-4 lg:mx-auto">
        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-left" />
      </div>
    </div>
  );
}
