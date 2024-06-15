// helpers.ts
import { BigNumber } from 'ethers'
import { formatEther } from '@/utils'

type ChartData = Record<number, BigNumber>

export async function getChartData(): Promise<ChartData> {
  // Static value
  const totalDeposited = BigNumber.from('2226000000000000000000') 

  // Start of today in milliseconds
  const today = new Date().setHours(0, 0, 0, 0,) 

  const data: ChartData = {
    [today]: totalDeposited
  }

  return data
}
