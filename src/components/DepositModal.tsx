import { useState } from 'react'
import { useAppPreferences } from '../context/useAppPreferences'
import { getDepositWalletHints } from '../lib/depositWalletHints'
import { useUi } from '../theme/ui'
import type { LiquidityPool } from '../types'
import { ChainBadge } from './ChainBadge'

type Props = {
  pool: LiquidityPool | null
  open: boolean
  onClose: () => void
  onConfirm: (amount: string) => void
  busy: boolean
}

export function DepositModal({
  pool,
  open,
  onClose,
  onConfirm,
  busy,
}: Props) {
  const [amount, setAmount] = useState('')
  const { theme, t } = useAppPreferences()
  const ui = useUi(theme)

  if (!open || !pool) return null

  const walletHints = getDepositWalletHints(pool.chain)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = amount.trim() || '1.0'
    onConfirm(v)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deposit-title"
    >
      <button
        type="button"
        className={ui.modalBackdrop}
        onClick={() => !busy && onClose()}
        aria-label={t('modal.close')}
      />
      <div className={ui.modalPanel}>
        <h2 id="deposit-title" className={ui.modalTitle}>
          {t('modal.title')}
        </h2>
        <p className={ui.modalDesc}>{t('modal.hint')}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <ChainBadge chain={pool.chain} theme={theme} />
          <span className={ui.modalPoolName}>{pool.name}</span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className={ui.poolCardDlDt}>{t('poolCard.tvl')}</dt>
            <dd className={ui.poolCardDlDd}>{pool.tvlUsd}</dd>
          </div>
          <div>
            <dt className={ui.poolCardDlDt}>{t('poolCard.apr')}</dt>
            <dd
              className={`font-medium ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              {pool.aprPercent}
            </dd>
          </div>
        </dl>
        <div
          className={
            theme === 'dark'
              ? 'mt-4 rounded-xl border border-zinc-700/80 bg-zinc-950/60 p-3'
              : 'mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3'
          }
        >
          <p
            className={
              theme === 'dark'
                ? 'mb-2 text-sm font-medium text-zinc-200'
                : 'mb-2 text-sm font-medium text-zinc-800'
            }
          >
            {t('modal.stakeRulesTitle')}
          </p>
          <ol
            className={`list-inside list-decimal space-y-1.5 text-sm ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            <li>{t('modal.stakeRule1')}</li>
            <li>{t('modal.stakeRule2')}</li>
          </ol>
        </div>
        <div
          className={
            theme === 'dark'
              ? 'mt-4 space-y-2 rounded-xl border border-dashed border-zinc-600/50 px-3 py-2.5'
              : 'mt-4 space-y-2 rounded-xl border border-dashed border-zinc-300 px-3 py-2.5'
          }
        >
          <p
            className={`text-sm ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}
          >
            <span className="text-zinc-500">{t('modal.availableStake')}</span>
            <span className="mx-1">:</span>
            <span className="font-mono font-medium tabular-nums">
              {walletHints.stakeableDisplay}
            </span>
          </p>
          <p
            className={`text-sm font-medium ${
              walletHints.gasInsufficient
                ? 'text-red-600 dark:text-red-400'
                : theme === 'dark'
                  ? 'text-zinc-300'
                  : 'text-zinc-700'
            }`}
          >
            <span
              className={
                walletHints.gasInsufficient ? '' : 'text-zinc-500'
              }
            >
              {t('modal.gasBalance')}
            </span>
            <span className="mx-1">:</span>
            <span className="font-mono tabular-nums">{walletHints.gasDisplay}</span>
          </p>
          {walletHints.gasInsufficient && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {t('modal.gasLowWarning')}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="lp-amount" className={ui.modalLabel}>
              {t('modal.amount')}
            </label>
            <input
              id="lp-amount"
              type="text"
              inputMode="decimal"
              placeholder={t('modal.placeholder')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={busy}
              className={ui.modalInput}
            />
          </div>
          <p className={ui.modalAmber}>{t('modal.rewardNote')}</p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => !busy && onClose()}
              disabled={busy}
              className={ui.modalBtnSecondary}
            >
              {t('modal.cancel')}
            </button>
            <button
              type="submit"
              disabled={busy}
              className={ui.modalBtnPrimary}
            >
              {busy ? t('modal.confirming') : t('modal.confirm')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
