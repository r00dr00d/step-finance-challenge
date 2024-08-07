import { useState } from 'react';
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

export function StepStakingBox() {
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <div className="flex">
          <TabHeadingButton active={activeTab === 'stake'} text="Stake" icon={<StakeIcon />} onClick={() => setActiveTab('stake')} />
          <TabHeadingButton active={activeTab === 'unstake'} text="Unstake" icon={<UnstakeIcon />} onClick={() => setActiveTab('unstake')} />
        </div>
        <div className='flex flex-col gap-2 bg-[#141414] p-4 rounded-b-md rounded-tr-md w-[450px]'>
          <div className="flex justify-between items-center text-sm">
            <span>You stake</span>
            <div className='flex gap-2 items-center'>
              <span className="text-[#7d7d7d] font-mono">Balance: 132.00000</span>
              <button className='text-xs p-1 transition-color duration-300 hover:text-black hover:bg-[#06d6a0] text-[#06d6a0] bg-[#003628] rounded-md uppercase'>Half</button>
              <button className='text-xs p-1 transition-color duration-300 hover:text-black hover:bg-[#06d6a0] text-[#06d6a0] bg-[#003628] rounded-md uppercase'>Max</button>
            </div>
          </div>
          <div className='bg-black flex justify-between px-2 py-4 rounded-md'>
            <div className='flex text-white text-sm items-center gap-2'>
              <img src="/step.png" alt="step" className="w-8 h-8" />
              <span>STEP</span>
            </div>
            <div className='flex flex-col items-end'>
              <input type="text" value="66.0000000" />
              <span>$3.83</span>
            </div>
          </div>
          <div className='flex py-4 items-center justify-center'>
            <ArrowDownIcon className="text-[#ffbb1d]" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>You receive</span>
            <div className='flex gap-2 items-center'>
              <span className="text-[#7d7d7d] font-mono">Balance: 3.00000</span>
            </div>
          </div>
          <div className='bg-black flex justify-between px-2 py-4 rounded-md'>
            <div className='flex text-white text-sm items-center gap-2'>
              <img src="/xstep.svg" alt="step" className="w-8 h-8" />
              <span>xSTEP</span>
            </div>
            <div className='flex flex-col items-end'>
              <input type="text" value="66.0000000" />
              <span>$3.83</span>
            </div>
          </div>
        </div>
      </div>
      <button className='w-[450px] h-[60px] font-extrabold transition-color duration-300 hover:text-black hover:bg-[#06d6a0] text-[#06d6a0] bg-[#003628] rounded-md'>
        Stake
      </button>
    </div>
  )
}