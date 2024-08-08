import { NextResponse } from 'next/server';
 
export async function GET() {
  const res = await fetch(`https://api.step.finance/v2/markets/prices?cluster=mainnet-beta`)
  const data = await res.json()

  // Do whatever you want
  return NextResponse.json(data, { status: res.status });
}