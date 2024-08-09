import { useEffect } from "react";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useAnchorProvider } from "../solana/solana-provider";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { useStepStakingProgram, STEP_STAKING_TOKEN_MINT, STEP_STAKING_XTOKEN_MINT } from "./step-staking-exports";
import toast from "react-hot-toast";

export function useStepStakingBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();

  return useSuspenseQuery({
    queryKey: [
      'step-finance',
      'balance',
      { endpoint: connection.rpcEndpoint, address: wallet.publicKey },
    ],
    queryFn: async () => {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet.publicKey!, {
        programId: TOKEN_PROGRAM_ID,
      });

      return {
        step: tokenAccounts.value.find(acc => acc.account.data.parsed.info.mint === STEP_STAKING_TOKEN_MINT.toString())?.account?.data?.parsed?.info?.tokenAmount ?? { amount: "0", decimals: 0, uiAmount: 0, uiAmountString: "0" },
        xStep: tokenAccounts.value.find(acc => acc.account.data.parsed.info.mint === STEP_STAKING_XTOKEN_MINT.toString())?.account?.data?.parsed?.info?.tokenAmount ?? { amount: "0", decimals: 0, uiAmount: 0, uiAmountString: "0" },
      }
    },
  });
}

export function useStepStakeOperation() {
  const provider = useAnchorProvider()
  const program = useStepStakingProgram(provider)

  return useMutation({
    mutationKey: [
      'step-finance',
      'stake-operation'
    ],
    mutationFn: async (amount: number) => {
      toast.loading('Approve transactions from your wallet')
      const walletTokenAccount = await getAssociatedTokenAddress(
        STEP_STAKING_TOKEN_MINT,
        provider.wallet.publicKey,
      )

      const walletXTokenAccount = await getAssociatedTokenAddress(
        STEP_STAKING_XTOKEN_MINT,
        provider.wallet.publicKey,
      )

      const [vaultPubkey, vaultBump] =
        PublicKey.findProgramAddressSync(
          [new PublicKey(STEP_STAKING_TOKEN_MINT).toBuffer()],
          program.programId
      )

      return program.rpc.stake(vaultBump, new BN(amount), {
        accounts: {
          tokenMint: STEP_STAKING_TOKEN_MINT,
          xTokenMint: STEP_STAKING_XTOKEN_MINT,
          tokenFromAuthority: provider.wallet.publicKey,
          tokenVault: vaultPubkey,
          tokenProgram: TOKEN_PROGRAM_ID.toString(),
          tokenFrom: walletTokenAccount,
          xTokenTo: walletXTokenAccount,
        }
      })
    },
    onSuccess() {
      toast.success('Stake operation successful')
    },
    onError(error) {
      toast.error(error.message)
    }
  })
}

export function useStepUnstakeOperation() {
  const provider = useAnchorProvider()
  const program = useStepStakingProgram(provider)

  return useMutation({
    mutationKey: [
      'step-finance',
      'unstake-operation'
    ],
    mutationFn: async (amount: number) => {
      toast.loading('Approve transactions from your wallet')
      const walletTokenAccount = await getAssociatedTokenAddress(
        STEP_STAKING_TOKEN_MINT,
        provider.wallet.publicKey,
      )

      const walletXTokenAccount = await getAssociatedTokenAddress(
        STEP_STAKING_XTOKEN_MINT,
        provider.wallet.publicKey,
      )

      const [vaultPubkey, vaultBump] =
        PublicKey.findProgramAddressSync(
          [new PublicKey(STEP_STAKING_TOKEN_MINT).toBuffer()],
          program.programId
      )

      return program.rpc.unstake(vaultBump, new BN(amount), {
        accounts: {
          tokenMint: STEP_STAKING_TOKEN_MINT,
          xTokenMint: STEP_STAKING_XTOKEN_MINT,
          xTokenFromAuthority: provider.wallet.publicKey,
          tokenVault: vaultPubkey,
          tokenProgram: TOKEN_PROGRAM_ID.toString(),
          xTokenFrom: walletXTokenAccount,
          tokenTo: walletTokenAccount,
        }
      })
    },
    onSuccess() {
      toast.success('Unstake operation successful')
    },
    onError(error) {
      toast.error(error.message)
    }
  })
}


export function useStepPrice() {
  const provider = useAnchorProvider()
  const program = useStepStakingProgram(provider)

  const [vaultPubkey] =
    PublicKey.findProgramAddressSync(
      [new PublicKey(STEP_STAKING_TOKEN_MINT).toBuffer()],
      program.programId
  )

  const query = useSuspenseQuery({
    queryKey: ['step-finance', 'emit-price'],
    queryFn: async () => {
      const price = await program.simulate.emitPrice({
        accounts: {
          tokenMint: STEP_STAKING_TOKEN_MINT,
          xTokenMint: STEP_STAKING_XTOKEN_MINT,
          tokenVault: vaultPubkey,
        }
      })

      return price?.events?.[0]?.data?.stepPerXstep ? Number(price.events[0].data.stepPerXstep) : 0;
    },
  });

  useEffect(() => {
    const listener = program.addEventListener('PriceChange', () => {
      query.refetch()
    })

    return () => {
      program.removeEventListener(listener)
    }
  }, [query, program])

  return query;

  
}