import Image from 'next/image';
import { StepStaking } from '@/components/step-staking/StepStaking';

export default function Page() {
  return <div className='flex flex-col items-center'>
    <div className='flex text-white items-center justify-center gap-3'>
      <Image src="/stake-logo.svg" width={32} height={32} alt="Step Stake logo" />
      <h1 className='text-3xl'>Stake STEP</h1>
    </div>
    <p className='text-sm py-8 text-[#b2b2b2]'>Stake STEP to receive xSTEP</p>
    <StepStaking />
  </div>;
}
