import { useState } from 'react';
import { twMerge } from 'tailwind-merge'
import { StakeIcon, UnstakeIcon } from "../ui/icons";


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
    <div>
      <div className="flex">
        <TabHeadingButton active={activeTab === 'stake'} text="Stake" icon={<StakeIcon />} onClick={() => setActiveTab('stake')} />
        <TabHeadingButton active={activeTab === 'unstake'} text="Unstake" icon={<UnstakeIcon />} onClick={() => setActiveTab('unstake')} />
      </div>
      <div className='bg-[#141414] p-4 rounded-b-md rounded-tr-md w-[450px]'>
        Contents here!!!
      </div>
    </div>
  )
}