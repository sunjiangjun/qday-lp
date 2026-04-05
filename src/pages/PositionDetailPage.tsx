import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppPreferences } from '../context/useAppPreferences'
import { buildPools } from '../data/mockPools'
import { poolCopy } from '../i18n/translate'
import { simulateRedeemLiquidity } from '../services/simulatedApi'
import { useUi } from '../theme/ui'
import type { Position } from '../types'
import { ChainBadge } from '../components/ChainBadge'

function parseLp(s: string): number {
  const n = parseFloat(String(s).replace(/,/g, ''))
  return Number.isFinite(n) ? n : 0
}

function formatLp(n: number): string {
  if (!Number.isFinite(n)) return '0'
  const t = n.toFixed(2)
  const [a, b] = t.split('.')
  return `${a.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${b}`
}

type Props = {
  positions: Position[]
  onPositionUpdate: (positionId: string, next: Position | null) => void
  onToast: (msg: string) => void
}

export function PositionDetailPage({
  positions,
  onPositionUpdate,
  onToast,
}: Props) {
  const { positionId } = useParams<{ positionId: string }>()
  const navigate = useNavigate()
  const { locale, theme, t } = useAppPreferences()
  const ui = useUi(theme)
  const [amount, setAmount] = useState('')
  const [busy, setBusy] = useState(false)

  const pools = useMemo(() => buildPools(locale), [locale])

  const position = useMemo(
    () => positions.find((p) => p.id === positionId),
    [positions, positionId],
  )

  const pool = useMemo(() => {
    if (!position) return undefined
    return pools.find((x) => x.id === position.poolId)
  }, [position, pools])

  if (!positionId || !position || !pool) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className={ui.loadingMuted}>{t('positionDetail.notFound')}</p>
        <Link to="/" className={`mt-4 inline-block ${ui.btnConnect}`}>
          {t('positionDetail.backHome')}
        </Link>
      </main>
    )
  }

  const stakeNum = parseLp(position.lpAmount)
  const pendingNum = parseFloat(position.pendingRewardsQday || '0')

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    const raw = amount.trim()
    const amt = parseFloat(raw.replace(/,/g, ''))
    if (!Number.isFinite(amt) || amt <= 0) {
      onToast(t('positionDetail.invalidAmount'))
      return
    }
    if (amt > stakeNum + 1e-9) {
      onToast(t('positionDetail.exceedsStake'))
      return
    }
    setBusy(true)
    let res: Awaited<ReturnType<typeof simulateRedeemLiquidity>>
    try {
      res = await simulateRedeemLiquidity(position, locale, raw || String(amt))
    } finally {
      setBusy(false)
    }
    if (res.ok) {
      const next = stakeNum - amt
      if (next <= 1e-6) {
        onPositionUpdate(position.id, null)
        navigate('/')
      } else {
        onPositionUpdate(position.id, {
          ...position,
          lpAmount: formatLp(next),
        })
      }
    }
    onToast(res.message)
  }

  const cardTitle =
    theme === 'dark'
      ? 'text-sm font-semibold text-emerald-400/90'
      : 'text-sm font-semibold text-emerald-700'
  const cardBox =
    theme === 'dark'
      ? 'rounded-2xl border border-zinc-700/80 bg-zinc-900/50 p-5'
      : 'rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm'
  const dlRow = 'flex justify-between gap-4 py-2 text-sm'
  const dt =
    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
  const dd =
    theme === 'dark' ? 'font-medium text-zinc-100' : 'font-medium text-zinc-900'

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          to="/"
          className={`inline-flex items-center text-sm ${theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'}`}
        >
          ← {t('positionDetail.back')}
        </Link>
      </div>

      <h1 className={`mb-6 text-2xl font-bold ${ui.headerTitle}`}>
        {poolCopy(locale, position.poolId).name}
      </h1>

      <section className={`mb-6 ${cardBox}`}>
        <h2 className={cardTitle}>{t('positionDetail.sectionPool')}</h2>
        <dl className="mt-3">
          <div className={dlRow}>
            <dt className={dt}>{t('poolCard.desc')}</dt>
            <dd className={dd}>{pool.description}</dd>
          </div>
          <div className={dlRow}>
            <dt className={dt}>{t('positions.colChain')}</dt>
            <dd className={dd}>
              <ChainBadge chain={pool.chain} theme={theme} />
            </dd>
          </div>
          <div className={dlRow}>
            <dt className={dt}>{t('poolCard.tvl')}</dt>
            <dd className={dd}>{pool.tvlUsd}</dd>
          </div>
          <div className={dlRow}>
            <dt className={dt}>{t('poolCard.apr')}</dt>
            <dd className={dd}>{pool.aprPercent}</dd>
          </div>
        </dl>
      </section>

      <section className={`mb-6 ${cardBox}`}>
        <h2 className={cardTitle}>{t('positionDetail.sectionStake')}</h2>
        <dl className="mt-3">
          <div className={dlRow}>
            <dt className={dt}>{t('positions.colLp')}</dt>
            <dd className={dd}>{position.lpAmount}</dd>
          </div>
          <div className={dlRow}>
            <dt className={dt}>{t('positions.colValue')}</dt>
            <dd className={dd}>{position.valueUsd}</dd>
          </div>
          <div className={dlRow}>
            <dt className={dt}>{t('positions.colDate')}</dt>
            <dd className={dd}>{position.depositedAt}</dd>
          </div>
        </dl>
      </section>

      <section className={`mb-6 ${cardBox}`}>
        <h2 className={cardTitle}>{t('positionDetail.sectionRewards')}</h2>
        <dl className="mt-3">
          <div className={dlRow}>
            <dt className={dt}>{t('positions.colPending')}</dt>
            <dd className={`${dd} font-mono text-emerald-600 dark:text-emerald-400`}>
              {pendingNum.toFixed(4)} QDAY
            </dd>
          </div>
        </dl>
      </section>

      <section className={`mb-6 ${cardBox}`}>
        <h2 className={cardTitle}>{t('positionDetail.sectionRedeem')}</h2>
        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {t('positionDetail.redeemHint')}
        </p>
        <form onSubmit={handleRedeem} className="mt-4 space-y-3">
          <div>
            <label htmlFor="redeem-amt" className={ui.modalLabel}>
              {t('positionDetail.redeemAmount')}
            </label>
            <input
              id="redeem-amt"
              type="text"
              inputMode="decimal"
              placeholder={t('positionDetail.redeemPlaceholder')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={busy}
              className={ui.modalInput}
            />
            <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {t('positionDetail.stakeAvailable')}: {position.lpAmount}
            </p>
          </div>
          <button
            type="submit"
            disabled={busy || stakeNum <= 0}
            className={`w-full ${ui.poolCardBtn} disabled:opacity-40`}
          >
            {busy ? t('positionDetail.redeeming') : t('positionDetail.redeemSubmit')}
          </button>
        </form>
      </section>

      <section className={`${cardBox}`}>
        <h2 className={cardTitle}>{t('positionDetail.sectionRules')}</h2>
        <ul
          className={`mt-3 list-inside list-decimal space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          <li>{t('positionDetail.rule1')}</li>
          <li>{t('positionDetail.rule2')}</li>
        </ul>
      </section>
    </main>
  )
}
