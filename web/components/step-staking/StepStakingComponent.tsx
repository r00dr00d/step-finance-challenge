'use client';
import { useAnchorProvider } from "../solana/solana-provider";
import { useStepStakeOperation, useStepStakingBalance, useStepUnstakeOperation } from "./step-staking-data-access";

export function StepStakingComponent() {
  const { wallet } = useAnchorProvider()
  const balance = useStepStakingBalance()
  const accounts = useStepStakingBalance()
  const { mutateAsync: stake } = useStepStakeOperation()
  const { mutateAsync: unstake } = useStepUnstakeOperation()
  
  return <div>
    <p className="py-4">Address: {wallet.publicKey.toString()}</p>
    <p className="py-4">Step Balance: {balance.data?.step?.uiAmount}</p>
    <p className="py-4">xStep Balance: {balance.data?.xStep?.uiAmount}</p>
    <button onClick={() => stake(2000000000).then(console.log).catch(console.error)}>Stake!</button>
    <button onClick={() => unstake(2000000000).then(console.log).catch(console.error)}>Unstake!</button>
  </div>
}