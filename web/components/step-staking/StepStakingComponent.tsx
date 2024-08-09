'use client';
import { StepStakingBox } from './StepStakingBox';
import {
  useStepPrice,
  useStepStakeOperation,
  useStepStakingBalance,
  useStepUnstakeOperation,
} from './step-staking-data-access';

export function StepStakingComponent() {
  const price = useStepPrice();
  const balance = useStepStakingBalance();
  const { mutateAsync: stake } = useStepStakeOperation();
  const { mutateAsync: unstake } = useStepUnstakeOperation();
  const stepToXstep = price?.data ? 1 * (1 / price.data) : null;
  const xStepToStep = price?.data ? 1 * price?.data : null;

  return (
    <StepStakingBox
      stepToXstep={stepToXstep}
      xStepToStep={xStepToStep}
      stepBalance={balance.data?.step?.uiAmount}
      xStepBalance={balance.data?.xStep?.uiAmount}
    />
  );
}
