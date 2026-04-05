/** 流动性所在链（用户在此链上添加 LP） */
export type LiquidityChain = 'ethereum' | 'qday'

export interface LiquidityPool {
  id: string
  /** 流动池名称（非 DEX 币对，仅为池标识） */
  name: string
  /** 一句话说明池用途或资产侧 */
  description: string
  /** 用户添加流动性的链 */
  chain: LiquidityChain
  /** 与 ChainBadge 一致的短标识，用于文案（ETH / QDAY） */
  chainLabel: string
  /** 展示用 TVL */
  tvlUsd: string
  aprPercent: string
}

/** 用户持仓（模拟） */
export interface Position {
  id: string
  poolId: string
  chain: LiquidityChain
  /** 与 ChainBadge 一致的短标识（ETH / QDAY） */
  chainLabel: string
  /** LP 数量展示 */
  lpAmount: string
  /** 价值（模拟 USD） */
  valueUsd: string
  depositedAt: string
  /** 待领取 QDAY（QDAY 链上） */
  pendingRewardsQday: string
}

export interface SimulatedTxResult {
  ok: boolean
  txHash: string
  message: string
}
