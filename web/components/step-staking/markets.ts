import { useQuery } from "@tanstack/react-query";
import { STEP_STAKING_TOKEN_MINT, STEP_STAKING_XTOKEN_MINT } from "./step-staking-exports";

export function useMarketPrices() {
  return useQuery<{ step: number; xStep: number }>({
    queryKey: ['step-finance', 'market-prices'],
    queryFn: async () => {
      const res = await fetch('/api/markets/prices')
      const body = await res.json()

      return {
        step: body[STEP_STAKING_TOKEN_MINT.toString()].price,
        xStep: body[STEP_STAKING_XTOKEN_MINT.toString()].price,
      } as unknown as { step: number; xStep: number }
    },
  })
}