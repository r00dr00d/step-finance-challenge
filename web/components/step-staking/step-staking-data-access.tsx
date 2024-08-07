import { useQuery, useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { getStepStakingProgram, STEP_STAKING_TOKEN_MINT, STEP_STAKING_XTOKEN_MINT } from "./step-staking-exports";
import { useAnchorProvider } from "../solana/solana-provider";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";


export function useStepStakingBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();

  return useQuery({
    queryKey: [
      'step-finance',
      'balance',
      { endpoint: connection.rpcEndpoint, address: wallet.publicKey },
    ],
    queryFn: async () => {
      const [tokenAccounts, token2022Accounts] = await Promise.all([
        connection.getParsedTokenAccountsByOwner(wallet.publicKey!, {
          programId: TOKEN_PROGRAM_ID,
        }),
        connection.getParsedTokenAccountsByOwner(wallet.publicKey!, {
          programId: TOKEN_2022_PROGRAM_ID,
        }),
      ]);

      console.log(tokenAccounts)

      return {
        step: tokenAccounts.value.find(acc => acc.account.data.parsed.info.mint === STEP_STAKING_TOKEN_MINT),//?.account?.data?.parsed?.info?.tokenAmount ?? { amount: "0", decimals: 0, uiAmount: 0, uiAmountString: "0" },
        xStep: tokenAccounts.value.find(acc => acc.account.data.parsed.info.mint === STEP_STAKING_XTOKEN_MINT)//?.account?.data?.parsed?.info?.tokenAmount ?? { amount: "0", decimals: 0, uiAmount: 0, uiAmountString: "0" },
      }
    },
  });
}

export function useStepStakeOperation() {
  const provider = useAnchorProvider()
  const program = getStepStakingProgram(provider)

  return useMutation({
    mutationKey: [
      'step-finance',
      'stake-operation'
    ],
    mutationFn: async (amount: number) => {
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
  })
}

export function useStepUnstakeOperation() {
  const provider = useAnchorProvider()
  const program = getStepStakingProgram(provider)

  return useMutation({
    mutationKey: [
      'step-finance',
      'unstake-operation'
    ],
    mutationFn: async (amount: number) => {
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
  })
}