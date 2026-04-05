import { useAppPreferences } from '../context/useAppPreferences'
import { useUi } from '../theme/ui'
import type { LiquidityPool } from '../types'
import { ChainBadge } from './ChainBadge'

type Props = {
  pool: LiquidityPool
  onDeposit: (pool: LiquidityPool) => void
}

export function PoolCard({ pool, onDeposit }: Props) {
  const { theme, t } = useAppPreferences()
  const ui = useUi(theme)

  return (
    <article
      className={ui.poolCard}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={ui.poolCardTitle}>{pool.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <ChainBadge chain={pool.chain} theme={theme} />
          </div>
        </div>
        <div className="text-right">
          <p className={`text-xs uppercase tracking-wide ${ui.poolCardMuted}`}>
            {t('poolCard.apr')}
          </p>
          <p className={ui.poolCardApr}>{pool.aprPercent}</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className={ui.poolCardDlDt}>{t('poolCard.tvl')}</dt>
          <dd className={ui.poolCardDlDd}>{pool.tvlUsd}</dd>
        </div>
        <div>
          <dt className={ui.poolCardDlDt}>{t('poolCard.desc')}</dt>
          <dd className={ui.poolCardDlDd}>{pool.description}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={() => onDeposit(pool)}
        className={ui.poolCardBtn}
      >
        {t('poolCard.addLiquidity')}
      </button>
    </article>
  )
}
