import type { Locale } from '../i18n/types'
import { poolCopy } from '../i18n/translate'
import type { LiquidityPool } from '../types'

const MOCK_POOL_BASE = [
  {
    id: 'eth-stable-pool-1',
    chain: 'ethereum' as const,
    chainLabel: 'ETH',
    tvlUsd: '$42.8M',
    aprPercent: '12.4%',
  },
  {
    id: 'eth-stable-pool-2',
    chain: 'ethereum' as const,
    chainLabel: 'ETH',
    tvlUsd: '$18.2M',
    aprPercent: '28.7%',
  },
  {
    id: 'qday-stable-pool',
    chain: 'qday' as const,
    chainLabel: 'QDAY',
    tvlUsd: '$6.4M',
    aprPercent: '35.1%',
  },
]

export function buildPools(locale: Locale): LiquidityPool[] {
  return MOCK_POOL_BASE.map((b) => {
    const { name, description } = poolCopy(locale, b.id)
    return { ...b, name, description }
  })
}
