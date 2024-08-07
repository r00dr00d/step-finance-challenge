'use client';
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useStepStakeOperation, useStepStakingBalance, useStepUnstakeOperation } from "./step-staking-data-access";

export function StepStakingComponent() {
  const accounts = useStepStakingBalance()
  const { mutateAsync: stake } = useStepStakeOperation()
  const { mutateAsync: unstake } = useStepUnstakeOperation()
  
  return <div>
    <button onClick={() => stake(2000000000).then(console.log).catch(console.error)}>Stake!</button>
    <button onClick={() => unstake(2000000000).then(console.log).catch(console.error)}>Unstake!</button>
  </div>
}