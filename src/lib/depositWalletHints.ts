import type { LiquidityChain } from '../types'

/** 演示用：低于该 ETH 当量视为 Gas 不足（仅模拟） */
const MIN_GAS_ETH_EQUIV = 0.001

/**
 * 模拟钱包：可质押余额与链上 Gas 展示。
 * Ethereum 示例为低 Gas（触发不足样式）；QDAY 为充足。
 */
export function getDepositWalletHints(chain: LiquidityChain): {
  stakeableDisplay: string
  gasDisplay: string
  gasInsufficient: boolean
} {
  if (chain === 'ethereum') {
    const gasEth = 0.00035
    return {
      stakeableDisplay: '12,450.32',
      gasDisplay: `${gasEth.toFixed(5)} ETH`,
      gasInsufficient: gasEth < MIN_GAS_ETH_EQUIV,
    }
  }
  const gasQday = 2.85
  return {
    stakeableDisplay: '3,128.90',
    gasDisplay: `${gasQday.toFixed(2)} QDAY`,
    gasInsufficient: false,
  }
}
