import { useNavigate } from 'react-router-dom'
import { useAppPreferences } from '../context/useAppPreferences'
import { poolCopy } from '../i18n/translate'
import { useUi } from '../theme/ui'
import type { Position } from '../types'
import { ChainBadge } from './ChainBadge'

type Props = {
  positions: Position[]
}

export function PositionsPanel({ positions }: Props) {
  const navigate = useNavigate()
  const { locale, theme, t } = useAppPreferences()
  const ui = useUi(theme)

  if (positions.length === 0) {
    return (
      <div className={ui.positionsEmpty}>{t('positions.empty')}</div>
    )
  }

  const go = (id: string) => {
    navigate(`/position/${encodeURIComponent(id)}`)
  }

  const rowClass = `${ui.tableRow} cursor-pointer`

  return (
    <div>
      <p
        className={`mb-2 text-left text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}
      >
        {t('positions.rowHint')}
      </p>
      <div className={ui.tableWrap}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className={ui.tableHead}>
              <th className="px-4 py-3 font-medium">{t('positions.colPool')}</th>
              <th className="px-4 py-3 font-medium">{t('positions.colChain')}</th>
              <th className="px-4 py-3 font-medium">{t('positions.colLp')}</th>
              <th className="px-4 py-3 font-medium">{t('positions.colValue')}</th>
              <th className="px-4 py-3 font-medium">{t('positions.colDate')}</th>
              <th className={ui.tableHeadPending}>
                {t('positions.colPending')}
              </th>
            </tr>
          </thead>
          <tbody>
            {positions.map((row) => (
              <tr
                key={row.id}
                role="link"
                tabIndex={0}
                className={rowClass}
                onClick={() => go(row.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    go(row.id)
                  }
                }}
              >
                <td className={ui.tableCellWhite}>
                  {poolCopy(locale, row.poolId).name}
                </td>
                <td className="px-4 py-3">
                  <ChainBadge chain={row.chain} theme={theme} />
                </td>
                <td className={ui.tableCell}>{row.lpAmount}</td>
                <td className={ui.tableCell}>{row.valueUsd}</td>
                <td className={ui.tableCellMuted}>{row.depositedAt}</td>
                <td className={ui.tableCellPending}>{row.pendingRewardsQday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

