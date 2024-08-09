import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ReactQueryProvider } from './react-query-provider';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Step Finance | The Front Page of Solana',
  description: 'Step Finance is the front page of Solana. Visualize, Analyze, Aggregate and Execute transactions across Solana in one easy to use Dashboard.',
};


const WalletLoader = dynamic(() => import('@/components/solana/wallet-loader'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
                <UiLayout links={[]}>
                  <WalletLoader>{children}</WalletLoader>
                </UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
