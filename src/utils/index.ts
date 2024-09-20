import { utils, BigNumber } from 'ethers'
import { Time } from '@distributedlab/tools'

const {
  formatEther: toEther,
  formatUnits,
  hexlify,
  isAddress,
  parseUnits,
} = utils

const formatNumberInt = (number: string | number, locale: string = 'en-US'): string => {
  const num = typeof number === 'string' ? parseFloat(number) : number
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

const formatEther: typeof toEther = (...params) => {
  const str = toEther(...params)
  const indexOfDot = str.indexOf('.')
  const sliced = indexOfDot !== -1 ? str.slice(0, indexOfDot + 5) : str

  return Number(Number(sliced).toFixed(4)).toString()
}

const convertStEthToUsd = (stEthAmountInWei: BigNumber, priceInUsd: number): string | undefined => {
  try {
    const etherAmount = parseFloat(formatEther(stEthAmountInWei))
    const totalUsdUnformatted = etherAmount * priceInUsd
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(totalUsdUnformatted)
  } catch (error) {
    console.error('Error calculating USD value:', error)
  }
}

const convertSpaceToUsd = (spaceAmountInWei: BigNumber, priceInUsd: number): string | undefined => {
  try {
    const etherAmount = parseFloat(formatEther(spaceAmountInWei))
    const totalUsdUnformatted = etherAmount * priceInUsd
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(totalUsdUnformatted)
  } catch (error) {
    console.error('Error calculating USD value:', error)
  }
}

const calculateDepositsAPY = (dailyRewardInUsd: number, totalDepositsInUsd: number): string | undefined => {
  try {
    const annualRewardUsd = dailyRewardInUsd * 365
    const apy = (annualRewardUsd / totalDepositsInUsd) * 100
    return `${apy.toFixed(2)}%`
  } catch (error) {
    console.error('Error calculating APY:', error)
  }
}

export {
  formatNumberInt,
  formatEther,
  formatUnits,
  hexlify,
  isAddress,
  parseUnits,
  toEther,
  Time,
  BigNumber,
  convertStEthToUsd,
  convertSpaceToUsd,
  calculateDepositsAPY,
}
