'use client';
import { useAnchorProvider } from "../solana/solana-provider";
import { StepStakingBox } from "./StepStakingBox";
import { useStepPrice, useStepStakeOperation, useStepStakingBalance, useStepUnstakeOperation } from "./step-staking-data-access";

export function StepStakingComponent() {
  const price = useStepPrice()
  const { wallet } = useAnchorProvider()
  const balance = useStepStakingBalance()
  const { mutateAsync: stake } = useStepStakeOperation()
  const { mutateAsync: unstake } = useStepUnstakeOperation()

  return <StepStakingBox />

  // return <div>
  //   <p className="py-4">Address: {wallet.publicKey.toString()}</p>
  //   <p className="py-4">Step Balance: {balance.data?.step?.uiAmount}</p>
  //   <p className="py-4">xStep Balance: {balance.data?.xStep?.uiAmount}</p>
  //   {price?.data ? <>
  //     <p className="py-4">1 step equals to {1 * (1 / price?.data)} xStep</p>
  //     <p className="py-4">1 xStep equals to {1 * price?.data} Step</p>
  //   </> : null}
  //   <div className="flex items-center justify-center gap-3">
  //     <button className="bg-white text-black p-2 rounded" onClick={() => stake(2000000000).then(console.log).catch(console.error)}>Stake!</button>
  //     <button className="bg-white text-black p-2 rounded" onClick={() => unstake(2000000000).then(console.log).catch(console.error)}>Unstake!</button>
  //   </div>
  // </div>
}