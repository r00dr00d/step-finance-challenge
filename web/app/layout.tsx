import './global.css';
import dynamic from 'next/dynamic';
import { Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import { UiLayout } from '@/components/ui/ui-layout';
import { ReactQueryProvider } from './react-query-provider';
import { SolanaProvider } from '@/services/solana/solana-provider';
import { ClusterProvider } from '@/services/cluster/cluster-data-access';

export const metadata = {
  title: 'Step Finance | The Front Page of Solana',
  description: 'Step Finance is the front page of Solana. Visualize, Analyze, Aggregate and Execute transactions across Solana in one easy to use Dashboard.',
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta'
})

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
})

const WalletLoader = dynamic(() => import('@/services/solana/wallet-loader'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.className} ${mono.variable}`}>
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
                <UiLayout>
                  <WalletLoader>{children}</WalletLoader>
                </UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
