// helpers.ts
import { BigNumber } from 'ethers'
import { formatEther } from '@/utils'

type ChartData = Record<number, BigNumber>

export async function getChartData(): Promise<ChartData> {
  const totalDeposited = BigNumber.from('450000000000000000000') // Static value
  const today = new Date().setHours(0, 0, 0, 0) // Start of today in milliseconds

  const data: ChartData = {
    [today]: totalDeposited
  }

  return data
}
