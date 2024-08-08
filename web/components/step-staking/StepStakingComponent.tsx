'use client';
import { useState } from 'react';
import {
  useStepPrice,
  useStepStakeOperation,
  useStepStakingBalance,
  useStepUnstakeOperation,
} from './step-staking-data-access';
import { TabHeadingButton } from '../ui/tabs';
import { UI_AMOUNT_TO_AMOUNT_QTY, validateStakeAmount, validateUnstakeAmount } from '@/utils';
import { StakeComponent } from './StakeComponent';
import { StakeIcon, UnstakeIcon } from '../ui/icons';
import { UnstakeComponent } from './UnstakeComponent';
import { useMarketPrices } from './markets';




export function StepStakingComponent() {
  const priceReq = useStepPrice();
  const marketPricesReq = useMarketPrices();
  const balance = useStepStakingBalance();
  
  const price = priceReq?.data ?? 0;
  const marketPrices = marketPricesReq?.data ?? { step: 0, xStep: 0 };

  const [operation, setOperation] = useState<'stake' | 'unstake'>('stake');
  const [input, setInput] = useState<{ type: 'step' | 'xstep', qty: number }>({ type: 'step', qty: 0 });

  const [error, errorLabel] = operation === 'stake'
    ? validateStakeAmount(input, price, balance?.data?.step?.uiAmount)
    : validateUnstakeAmount(input, price, balance?.data?.step?.uiAmount);

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
          {operation === 'stake' ? <StakeComponent marketPrices={marketPrices} price={price} stepUiBalance={balance?.data?.step?.uiAmount} xStepUiBalance={balance?.data?.xStep?.uiAmount} input={input} onInputUpdate={setInput} /> : <UnstakeComponent marketPrices={marketPrices} price={price} stepUiBalance={balance?.data?.step?.uiAmount} xStepUiBalance={balance?.data?.xStep?.uiAmount} input={input} onInputUpdate={setInput} />}
        </div>
      </div>

      <button
        disabled={error}
        className="w-[450px] h-[60px] font-extrabold transition-colors duration-300 rounded-md text-[#06d6a0] bg-[#003628] hover:text-black hover:bg-[#06d6a0] disabled:bg-[#434343] disabled:text-[#b2b2b2] disabled:cursor-not-allowed"
        onClick={() => operation === 'stake' ? stake(input.qty * UI_AMOUNT_TO_AMOUNT_QTY) : unstake(input.qty * UI_AMOUNT_TO_AMOUNT_QTY)}
      >
        {error ? errorLabel : operation}
      </button>
    </div>
  )
}
