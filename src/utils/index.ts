import { utils, BigNumber } from 'ethers'
import { Time } from '@distributedlab/tools'

const {
  formatEther: toEther,
  formatUnits,
  hexlify,
  isAddress,
  parseUnits,
} = utils

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

export {
  formatEther,
  formatUnits,
  hexlify,
  isAddress,
  parseUnits,
  toEther,
  Time,
  BigNumber,
  convertStEthToUsd
}
