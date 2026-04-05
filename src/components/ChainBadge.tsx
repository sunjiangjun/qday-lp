import type { ThemeId } from '../i18n/types'
import type { LiquidityChain } from '../types'
import { UI } from '../theme/ui'

const keys: Record<LiquidityChain, 'badgeEth' | 'badgeQday'> = {
  ethereum: 'badgeEth',
  qday: 'badgeQday',
}

export function ChainBadge({
  chain,
  theme,
}: {
  chain: LiquidityChain
  theme: ThemeId
}) {
  const label = chain === 'ethereum' ? 'ETH' : 'QDAY'
  const cls = UI[theme][keys[chain]]
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${cls}`}
    >
      {label}
    </span>
  )
}
