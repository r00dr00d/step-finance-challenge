import Image from 'next/image';
import { ArrowDownIcon } from "../ui/icons";
import { parseInput, stepToXStep, xStepToStep } from '@/utils';

type UnstakeComponentProps = {
  price: number;
  stepUiBalance: number;
  xStepUiBalance: number;
  marketPrices: { step: number, xStep: number };
  input: { type: 'step' | 'xstep', qty: number; str: string },
  onInputUpdate: (input: { type: 'step' | 'xstep', qty: number; str: string }) => void;
};

export const UnstakeComponent = ({ price, marketPrices, stepUiBalance, xStepUiBalance, input, onInputUpdate }: UnstakeComponentProps) => {
  const step = input.type === 'step' ? input.qty : xStepToStep(input.qty, price);
  const xStep = input.type === 'xstep' ? input.qty : stepToXStep(input.qty, price);

  const stepInputValue = input.type === 'step' ? input.str : step;
  const xStepInputValue = input.type === 'xstep' ? input.str : xStep;

  const stepUsd = Math.floor((step * marketPrices.step) * 100) / 100;
  const xStepUsd = Math.floor((xStep * marketPrices.xStep) * 100) / 100;

  return (
    <>
      <div className="flex justify-between items-center text-sm">
        <span className="text-[white]">You stake</span>
        <div className='flex gap-2 items-center'>
          <span className="text-[#7d7d7d]">Balance: <span className='font-mono'>{xStepUiBalance}</span></span>
          <button className='text-xs p-1 transition-color duration-300 hover:text-black hover:bg-[#06d6a0] text-[#06d6a0] bg-[#003628] rounded-md uppercase' onClick={() => onInputUpdate(parseInput(stepUiBalance / 2, 'xstep'))}>Half</button>
          <button className='text-xs p-1 transition-color duration-300 hover:text-black hover:bg-[#06d6a0] text-[#06d6a0] bg-[#003628] rounded-md uppercase' onClick={() => onInputUpdate(parseInput(stepUiBalance / 2, 'xstep'))}>Max</button>
        </div>
      </div>
      <div className='bg-black flex justify-between px-2 py-4 rounded-md'>
        <div className='flex text-white text-sm items-center gap-2'>
        <Image src="/xstep.svg" alt="xSTEP" width={32} height={32} />
          <span>xSTEP</span>
        </div>
        <div className='flex flex-col justify-center items-end h-[2.5rem]'>
          <input placeholder='0.00' className='placeholder-gray-40 font-mono text-base text-[white] text-right appearance: none; border-none bg-transparent outline-none' type="text" value={xStepInputValue}  onChange={e => onInputUpdate(parseInput(e.target.value, 'xstep'))} />
          {input.qty ? <span className='text-xs text-[#7d7d7d]'>${xStepUsd}</span> : null}
        </div>
      </div>
      <div className='flex py-4 items-center justify-center'>
        <ArrowDownIcon className="text-[#ffbb1d]" />
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-[white]">You receive</span>
        <div className='flex gap-2 items-center'>
          <span className="text-[#7d7d7d] font-mono">Balance: <span className='font-mono'>{stepUiBalance}</span></span>
        </div>
      </div>
      <div className='bg-black flex justify-between px-2 py-4 rounded-md'>
        <div className='flex text-white text-sm items-center gap-2'>
        <Image src="/step.png" alt="STEP" width={32} height={32} />
          <span>STEP</span>
        </div>
        <div className='flex flex-col justify-center items-end h-[2.5rem]'>
          <input placeholder='0.00' className='placeholder-gray-400 font-mono text-base text-[white] text-right appearance: none; border-none bg-transparent outline-none ' type="text" value={stepInputValue} onChange={e => onInputUpdate(parseInput(e.target.value, 'step'))} />
          {input.qty > 0 ? <span className='text-xs text-[#7d7d7d]'>${stepUsd}</span> : null}
        </div>
      </div>
    </>
  )
};