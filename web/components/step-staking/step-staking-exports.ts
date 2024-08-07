import StepStakingIdl from './idl.json';
import { StepStaking } from './idl_types';
import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useMemo } from 'react';

export const STEP_STAKING_VAULT_PUB_KEY = new PublicKey(`ANYxxG365hutGYaTdtUQG8u2hC4dFX9mFHKuzy9ABQJi`);
export const STEP_STAKING_PROGRAM_ID = new PublicKey(`Stk5NCWomVN3itaFjLu382u9ibb5jMSHEsh6CuhaGjB`);
export const STEP_STAKING_TOKEN_MINT = new PublicKey(`StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT`)
export const STEP_STAKING_XTOKEN_MINT = new PublicKey(`xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G`)

export function getStepStakingProgram(provider: AnchorProvider) {
  return new Program<StepStaking>(StepStakingIdl as StepStaking, STEP_STAKING_PROGRAM_ID, provider);
}

export function useStepStakingProgram(provider: AnchorProvider) {
  return useMemo(() => getStepStakingProgram(provider), [provider]);
}

