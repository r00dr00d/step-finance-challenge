'use client';

import { WalletButton } from '../solana/solana-provider';
import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export function UiLayout({
  children,
  links,
}: {
  children: ReactNode;
  links: { label: string; path: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-[#000] text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            <img className="h-4 md:h-6" alt="Logo" src="/logo.png" />
          </Link>
          <ul className="menu menu-horizontal px-1 space-x-2">
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link
                  className={pathname.startsWith(path) ? 'active' : ''}
                  href={path}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-none space-x-2">
          <WalletButton />
          {/* <ClusterUiSelect /> */}
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
        <Toaster position="bottom-right" />
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Generated by{' '}
            <a
              className="link hover:text-white"
              href="https://github.com/solana-developers/create-solana-dapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              create-solana-dapp
            </a>
          </p>
        </aside>
      </footer>
    </div>
  );
}
