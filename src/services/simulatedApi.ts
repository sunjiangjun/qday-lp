import { buildPools } from '../data/mockPools'
import type { Locale } from '../i18n/types'
import { poolCopy, t } from '../i18n/translate'
import type { LiquidityPool, Position, SimulatedTxResult } from '../types'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

function randomHash(): string {
  const hex = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join('')
  return `0x${hex}`
}

/** 模拟：连接目标链 RPC + 广播交易 */
export async function simulateAddLiquidity(
  pool: LiquidityPool,
  amountLabel: string,
  locale: Locale,
): Promise<SimulatedTxResult> {
  await delay(900 + Math.random() * 600)
  return {
    ok: true,
    txHash: randomHash(),
    message: t(locale, 'tx.addLiquidity', {
      chain: pool.chainLabel,
      name: pool.name,
      amount: amountLabel,
    }),
  }
}

/** 模拟：赎回 / 撤出部分 LP */
export async function simulateRedeemLiquidity(
  position: Position,
  locale: Locale,
  amountLabel: string,
): Promise<SimulatedTxResult> {
  await delay(800 + Math.random() * 500)
  const { name } = poolCopy(locale, position.poolId)
  return {
    ok: true,
    txHash: randomHash(),
    message: t(locale, 'tx.redeem', {
      chain: position.chainLabel,
      name,
      amount: amountLabel,
    }),
  }
}

/** 模拟后端：拉取池列表 */
export async function fetchPoolsMock(
  locale: Locale,
): Promise<LiquidityPool[]> {
  await delay(300)
  return buildPools(locale)
}
