'use client';
import { useState } from 'react';
import {
  useStepPrice,
  useStepStakeOperation,
  useStepStakingBalance,
  useStepUnstakeOperation,
} from './step-staking-data-access';
import { TabHeadingButton } from '../ui/tabs';
import { StakeIcon, UnstakeIcon } from '../ui/icons';
import { StakeComponent } from './StakeComponent';
import { UnstakeComponent } from './UnstakeComponent';

export function StepStakingComponent() {
  const price = useStepPrice();
  const balance = useStepStakingBalance();

  const [operation, setOperation] = useState<'stake' | 'unstake'>('stake');
  const [input, setInput] = useState<{ type: 'step' | 'xstep', qty: number }>({ type: 'step', qty: 0 });

  const { mutateAsync: stake } = useStepStakeOperation();
  const { mutateAsync: unstake } = useStepUnstakeOperation();

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <div className="flex">
          <TabHeadingButton active={operation === 'stake'} text="Stake" icon={<StakeIcon />} onClick={() => setOperation('stake')} />
          <TabHeadingButton active={operation === 'unstake'} text="Unstake" icon={<UnstakeIcon />} onClick={() => setOperation('unstake')} />
        </div>
        <div className='flex flex-col gap-2 bg-[#141414] p-4 rounded-b-md rounded-tr-md w-[450px]'>
          {operation === 'stake' ? <StakeComponent price={price?.data ?? 0} stepUiBalance={balance?.data?.step?.uiAmount} xStepUiBalance={balance?.data?.xStep?.uiAmount} input={input} onInputUpdate={setInput} /> : <UnstakeComponent price={price?.data ?? 0} stepUiBalance={balance?.data?.step?.uiAmount} xStepUiBalance={balance?.data?.xStep?.uiAmount} input={input} onInputUpdate={setInput} />}
        </div>
      </div>
{/* 
      <button className={`${buttonStyles} ${stake && stake > 0 ? activeButtonStyles : inactiveButtonStyles}`}>
        {activeTab === 'stake'
          ? stake && stake > 0
            ? 'Stake'
            : 'Enter an amount'
          : stake && stake > 0
          ? 'Unstake'
          : 'Enter an amount'
        }
      </button> */}
    </div>
  )
}
