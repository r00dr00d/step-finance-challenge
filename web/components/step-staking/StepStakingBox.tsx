import { useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge'
import { ArrowDownIcon, StakeIcon, UnstakeIcon } from "../ui/icons";

const TabHeadingButton = ({ icon = null, active = false, text, onClick }) => (
  <div onClick={onClick} className={
    twMerge(
      'cursor-pointer font-extrabold flex items-center gap-4 transition-colors duration-300 bg-[#0a0a0a] text-[#787878] hover:text-[#06d6a0] px-8 py-4 rounded-t-md',
      active && 'bg-[#141414] text-[#00f8b7]'
    )
  }>
    {icon}
    <span>{text}</span>
  </div>
)

const buttonStyles = 'w-[450px] h-[60px] font-extrabold transition-colors duration-300 rounded-md';
const activeButtonStyles = 'text-[#06d6a0] bg-[#003628] hover:text-black hover:bg-[#06d6a0]';
const inactiveButtonStyles = 'bg-[#434343] text-[#b2b2b2] cursor-not-allowed';

interface StepStakingBoxProps {
  stepBalance: string;
  xStepBalance: string;
  stepToXstep: number | null;
  xStepToStep: number | null;
}

export const StepStakingBox: React.FC<StepStakingBoxProps> = ({ stepToXstep, xStepToStep, stepBalance, xStepBalance }) => {
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('unstake')
  const [stake, setStake] = useState<number | null>()
  const [recive, setRecive] = useState<number | null>()



  const handleStake = (e: any) => {
    setStake(e.target.value);
    if(stepToXstep){
      if(e.target.value){
        setRecive(e.target.value * stepToXstep)
      }else {
        setRecive(null)
      }
    }
  };

  const handleMax = () => {
    if(activeTab === 'stake'){
      setStake(Number(stepBalance));
      if(stepToXstep){
        if(Number(stepBalance)){
          setRecive(Number(stepBalance) * stepToXstep)
        }else {
          setRecive(null)
        }
      }
    } else {
      setStake(Number(xStepBalance));
      if(xStepToStep){
        if(Number(xStepBalance)){
          setRecive(Number(xStepBalance) * xStepToStep)
        }else {
          setRecive(null)
        }
      }
    }
  };

  const handleHalf = () => {
    if(activeTab === 'stake'){
      setStake(Number(stepBalance) / 2);
      if(stepToXstep){
        if(Number(stepBalance)){
          setRecive((Number(stepBalance) / 2) * stepToXstep)
        }else {
          setRecive(null)
        }
      }
    } else {
      setStake(Number(xStepBalance)/2);
      if(xStepToStep){
        if(Number(xStepBalance)){
          setRecive((Number(xStepBalance) / 2) * xStepToStep)
        }else {
          setRecive(null)
        }
      }
    }
  };


  return (
    <div className='flex flex-col gap-3'>
      <div>
        <div className="flex">
          <TabHeadingButton active={activeTab === 'stake'} text="Stake" icon={<StakeIcon />} onClick={() => setActiveTab('stake')} />
          <TabHeadingButton active={activeTab === 'unstake'} text="Unstake" icon={<UnstakeIcon />} onClick={() => setActiveTab('unstake')} />
        </div>
        <div className='flex flex-col gap-2 bg-[#141414] p-4 rounded-b-md rounded-tr-md w-[450px]'>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[white]">You stake</span>
            <div className='flex gap-2 items-center'>
              <span className="text-[#7d7d7d] font-mono">Balance:{ (activeTab === 'stake' ? stepBalance: xStepBalance ) || ""}</span>
              <button className='text-xs p-1 transition-color duration-300 hover:text-black hover:bg-[#06d6a0] text-[#06d6a0] bg-[#003628] rounded-md uppercase' onClick={handleHalf}>Half</button>
              <button className='text-xs p-1 transition-color duration-300 hover:text-black hover:bg-[#06d6a0] text-[#06d6a0] bg-[#003628] rounded-md uppercase' onClick={handleMax}>Max</button>
            </div>
          </div>
          <div className='bg-black flex justify-between px-2 py-4 rounded-md'>
            <div className='flex text-white text-sm items-center gap-2'>
            <Image src="/step.png" alt="STEP" width={32} height={32} />
              <span>STEP</span>
            </div>
            <div className='flex flex-col items-end'>
              <input placeholder='0.00' className='placeholder-gray-400 font-mono text-base text-[white] text-right appearance: none; border-none bg-transparent outline-none ' type="text" value={stake} onChange={handleStake} />
              {stake && stake > 0 ? <span className='text-xs text-[#7d7d7d]'>$3.83</span> : null}
            </div>
          </div>
          <div className='flex py-4 items-center justify-center'>
            <ArrowDownIcon className="text-[#ffbb1d]" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[white]">You receive</span>
            <div className='flex gap-2 items-center'>
              <span className="text-[#7d7d7d] font-mono">Balance:{ (activeTab === 'stake' ? xStepBalance: stepBalance ) || ""}</span>
            </div>
          </div>
          <div className='bg-black flex justify-between px-2 py-4 rounded-md'>
            <div className='flex text-white text-sm items-center gap-2'>
            <Image src="/xstep.svg" alt="xSTEP" width={32} height={32} />
              <span>xSTEP</span>
            </div>
            <div className='flex flex-col items-end'>
              <input placeholder='0.00' className='placeholder-gray-40 font-mono text-base text-[white] text-right appearance: none; border-none bg-transparent outline-none' type="text" value={recive ? recive : ""} />
              {stake && stake > 0 ? <span className='text-xs text-[#7d7d7d]'>$3.83</span> : null}
            </div>
          </div>
        </div>
      </div>

      <button className={`${buttonStyles} ${stake && stake > 0 ? activeButtonStyles : inactiveButtonStyles}`}>
        {activeTab === 'stake'
          ? stake && stake > 0
            ? 'Stake'
            : 'Enter an amount'
          : stake && stake > 0
          ? 'Unstake'
          : 'Enter an amount'
        }
      </button>
    </div>
  )
}