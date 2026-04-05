import { useCallback, useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppPreferences } from './context/useAppPreferences'
import { INITIAL_MOCK_POSITIONS } from './data/mockPositions'
import { simulateAddLiquidity, fetchPoolsMock } from './services/simulatedApi'
import { useUi } from './theme/ui'
import type { LiquidityPool, Position } from './types'
import { APP_VERSION } from './version'
import { DepositModal } from './components/DepositModal'
import { PoolCard } from './components/PoolCard'
import { PositionsPanel } from './components/PositionsPanel'
import { Toast } from './components/Toast'
import { PositionDetailPage } from './pages/PositionDetailPage'

function sumRewardsQday(positions: Position[]): number {
  return positions.reduce(
    (acc, p) => acc + parseFloat(p.pendingRewardsQday || '0'),
    0,
  )
}

function formatQday(n: number): string {
  if (!Number.isFinite(n)) return '0'
  return n.toFixed(4)
}

/** 模拟：历史已计入的总奖励基数（含已领取等），与待领取相加展示为总奖励 */
const MOCK_TOTAL_REWARDS_BASE_QDAY = 3456.789

export default function App() {
  const { locale, theme, setLocale, setTheme, t } = useAppPreferences()
  const ui = useUi(theme)

  const [pools, setPools] = useState<LiquidityPool[]>([])
  const [poolsLoading, setPoolsLoading] = useState(true)
  const [wallet, setWallet] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [positions, setPositions] = useState<Position[]>(INITIAL_MOCK_POSITIONS)
  const [modalPool, setModalPool] = useState<LiquidityPool | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [txBusy, setTxBusy] = useState(false)
  const [toast, setToast] = useState('')

  const totalPendingQday = useMemo(
    () => sumRewardsQday(positions),
    [positions],
  )

  const totalRewardsQday = useMemo(
    () => MOCK_TOTAL_REWARDS_BASE_QDAY + totalPendingQday,
    [totalPendingQday],
  )

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 4200)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setPoolsLoading(true)
      try {
        const list = await fetchPoolsMock(locale)
        if (!cancelled) setPools(list)
      } finally {
        if (!cancelled) setPoolsLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [locale])

  /** 连接钱包后：奖励随时间微量增长 */
  useEffect(() => {
    if (!wallet) return
    const id = window.setInterval(() => {
      setPositions((prev) =>
        prev.map((p) => {
          const cur = parseFloat(p.pendingRewardsQday || '0')
          const delta = Math.random() * 0.008 + 0.001
          return {
            ...p,
            pendingRewardsQday: (cur + delta).toFixed(4),
          }
        }),
      )
    }, 5000)
    return () => window.clearInterval(id)
  }, [wallet])

  const connectWallet = async () => {
    setTxBusy(true)
    await new Promise((r) => setTimeout(r, 600))
    setWallet(true)
    setWalletAddress(`0x${'a1b2c3d4'.padEnd(8, '0')}…${'9f8e'.padStart(4, '0')}`)
    setTxBusy(false)
    showToast(t('toast.walletConnected'))
  }

  const disconnectWallet = () => {
    setWallet(false)
    setWalletAddress(null)
  }

  const openDeposit = (pool: LiquidityPool) => {
    if (!wallet) {
      showToast(t('toast.connectFirst'))
      return
    }
    setModalPool(pool)
    setModalOpen(true)
  }

  const handleDepositConfirm = async (amount: string) => {
    if (!modalPool) return
    setTxBusy(true)
    let res: Awaited<ReturnType<typeof simulateAddLiquidity>>
    try {
      res = await simulateAddLiquidity(modalPool, amount, locale)
    } finally {
      setTxBusy(false)
    }
    if (res.ok) {
      const today = new Date().toISOString().slice(0, 10)
      const newPosition: Position = {
        id: `pos-${Date.now()}`,
        poolId: modalPool.id,
        chain: modalPool.chain,
        chainLabel: modalPool.chainLabel,
        lpAmount: amount,
        valueUsd: '$—',
        depositedAt: today,
        pendingRewardsQday: (Math.random() * 0.5).toFixed(4),
      }
      setPositions((p) => [newPosition, ...p])
      setModalOpen(false)
      setModalPool(null)
    }
    showToast(res.message)
  }

  const pillBtn = (active: boolean) =>
    `${ui.btnGhost} ${active ? 'ring-1 ring-emerald-500/60' : ''}`

  return (
    <div className={ui.shell}>
      <header className={ui.header}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="text-left">
            <h1
              className={`text-xl font-bold tracking-tight md:text-2xl ${ui.headerTitle}`}
            >
              {t('app.title')}
            </h1>
            <p className={`mt-0.5 max-w-xl text-sm ${ui.headerSubtitle}`}>
              {t('app.subtitlePart1')}{' '}
              <span
                className={
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                }
              >
                QDAY
              </span>{' '}
              {t('app.subtitlePart2')}{' '}
              <span
                className={
                  theme === 'dark' ? 'font-medium text-white' : 'font-medium text-zinc-900'
                }
              >
                QDAY
              </span>{' '}
              {t('app.subtitlePart3')}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLocale('zh')}
                className={pillBtn(locale === 'zh')}
              >
                {t('header.langZh')}
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={pillBtn(locale === 'en')}
              >
                {t('header.langEn')}
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={pillBtn(theme === 'dark')}
                aria-label={t('header.themeDark')}
                title={t('header.themeDark')}
              >
                <span className="text-base leading-none" aria-hidden>
                  🌙
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={pillBtn(theme === 'light')}
                aria-label={t('header.themeLight')}
                title={t('header.themeLight')}
              >
                <span className="text-base leading-none" aria-hidden>
                  ☀️
                </span>
              </button>
            </div>
            {wallet && walletAddress ? (
              <>
                <span className={ui.walletChip}>{walletAddress}</span>
                <button
                  type="button"
                  onClick={disconnectWallet}
                  className={ui.btnDisconnect}
                >
                  {t('header.disconnect')}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={connectWallet}
                disabled={txBusy}
                className={ui.btnConnect}
              >
                {txBusy ? t('header.connecting') : t('header.connectWallet')}
              </button>
            )}
          </div>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="mx-auto max-w-6xl px-4 py-8">
              <section
                aria-label={t('rewards.pending')}
                className={ui.rewardsSection}
              >
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                  <div className="text-left">
                    <p className={ui.rewardsLabel}>{t('rewards.pending')}</p>
                    <p className={ui.rewardsValue}>
                      {wallet ? (
                        <>
                          {formatQday(totalPendingQday)}{' '}
                          <span className={ui.rewardsToken}>QDAY</span>
                        </>
                      ) : (
                        <span
                          className={
                            theme === 'dark'
                              ? 'text-zinc-500'
                              : 'text-zinc-400'
                          }
                        >
                          --
                        </span>
                      )}
                    </p>
                  </div>
                  <div className={ui.rewardsCol2}>
                    <p className={ui.rewardsLabel}>{t('rewards.total')}</p>
                    <p className={ui.rewardsValue}>
                      {wallet ? (
                        <>
                          {formatQday(totalRewardsQday)}{' '}
                          <span className={ui.rewardsToken}>QDAY</span>
                        </>
                      ) : (
                        <span
                          className={
                            theme === 'dark'
                              ? 'text-zinc-500'
                              : 'text-zinc-400'
                          }
                        >
                          --
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <p className={ui.rewardsHint}>{t('rewards.hint')}</p>
              </section>

              <section className="mb-12">
                <h2 className={ui.sectionHeading}>{t('poolList.title')}</h2>
                {poolsLoading ? (
                  <p className={ui.loadingMuted}>{t('poolList.loading')}</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {pools.map((pool) => (
                      <PoolCard
                        key={pool.id}
                        pool={pool}
                        onDeposit={openDeposit}
                      />
                    ))}
                  </div>
                )}
              </section>

              {wallet && (
                <section>
                  <h2 className={ui.sectionHeading}>{t('positions.title')}</h2>
                  <PositionsPanel positions={positions} />
                </section>
              )}
            </main>
          }
        />
        <Route
          path="/position/:positionId"
          element={
            <PositionDetailPage
              positions={positions}
              onPositionUpdate={(id, next) => {
                if (!next) setPositions((p) => p.filter((x) => x.id !== id))
                else
                  setPositions((p) =>
                    p.map((x) => (x.id === id ? next : x)),
                  )
              }}
              onToast={showToast}
            />
          }
        />
      </Routes>

      <DepositModal
        pool={modalPool}
        open={modalOpen}
        busy={txBusy}
        onClose={() => {
          if (!txBusy) {
            setModalOpen(false)
            setModalPool(null)
          }
        }}
        onConfirm={handleDepositConfirm}
      />

      <Toast message={toast} visible={!!toast} theme={theme} />

      <footer className={ui.footer}>
        <p className={ui.footerDisclaimer}>{t('footer.disclaimer')}</p>
        <p className={ui.footerVersion}>
          {t('footer.versionLabel', { version: APP_VERSION })}
        </p>
      </footer>
    </div>
  )
}
