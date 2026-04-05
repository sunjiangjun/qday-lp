import type { ThemeId } from '../i18n/types'

export const UI: Record<
  ThemeId,
  {
    shell: string
    header: string
    headerTitle: string
    headerSubtitle: string
    walletChip: string
    btnDisconnect: string
    btnConnect: string
    btnGhost: string
    rewardsSection: string
    rewardsLabel: string
    rewardsValue: string
    rewardsToken: string
    rewardsHint: string
    rewardsCol2: string
    sectionHeading: string
    loadingMuted: string
    positionsEmpty: string
    tableWrap: string
    tableHead: string
    tableHeadPending: string
    tableRow: string
    tableCell: string
    tableCellWhite: string
    tableCellMuted: string
    tableCellPending: string
    tableBtn: string
    poolCard: string
    poolCardTitle: string
    poolCardMuted: string
    poolCardApr: string
    poolCardDlDt: string
    poolCardDlDd: string
    poolCardBtn: string
    modalBackdrop: string
    modalPanel: string
    modalTitle: string
    modalPoolName: string
    modalDesc: string
    modalLabel: string
    modalInput: string
    modalAmber: string
    modalBtnSecondary: string
    modalBtnPrimary: string
    footer: string
    footerDisclaimer: string
    footerVersion: string
    toast: string
    badgeEth: string
    badgeQday: string
  }
> = {
  dark: {
    shell:
      'min-h-svh bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100',
    header: 'border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md',
    headerTitle: 'text-white',
    headerSubtitle: 'text-zinc-400',
    walletChip:
      'hidden rounded-lg bg-zinc-800 px-3 py-2 font-mono text-xs text-zinc-300 sm:inline',
    btnDisconnect:
      'rounded-xl border border-zinc-600 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800',
    btnConnect:
      'rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50',
    btnGhost:
      'rounded-lg border border-zinc-600 bg-zinc-900/80 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800',
    rewardsSection:
      'mb-10 rounded-2xl border border-emerald-500/25 bg-emerald-950/30 p-6',
    rewardsLabel: 'text-xs font-medium uppercase tracking-wider text-emerald-400/90',
    rewardsValue: 'mt-1 font-mono text-3xl font-bold text-white md:text-4xl',
    rewardsToken:
      'text-lg font-sans font-semibold text-emerald-300/90',
    rewardsHint: 'mt-6 text-sm text-zinc-400',
    rewardsCol2:
      'text-left sm:border-l sm:border-emerald-500/20 sm:pl-10',
    sectionHeading: 'mb-4 text-left text-lg font-semibold text-white',
    loadingMuted: 'text-left text-zinc-500',
    positionsEmpty:
      'rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-12 text-center text-zinc-500',
    tableWrap: 'overflow-x-auto rounded-2xl border border-zinc-700/80 bg-zinc-900/50',
    tableHead: 'border-b border-zinc-700 text-zinc-400',
    tableHeadPending: 'px-4 py-3 font-medium text-emerald-300/90',
    tableRow:
      'border-b border-zinc-800 last:border-0 hover:bg-zinc-800/40',
    tableCell: 'px-4 py-3 text-zinc-300',
    tableCellWhite: 'px-4 py-3 font-medium text-white',
    tableCellMuted: 'px-4 py-3 text-zinc-400',
    tableCellPending: 'px-4 py-3 font-mono text-emerald-400',
    tableBtn:
      'rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-50',
    poolCard:
      'flex flex-col rounded-2xl border border-zinc-700/80 bg-zinc-900/80 p-5 text-left shadow-lg transition hover:border-emerald-500/30 hover:shadow-emerald-900/20',
    poolCardTitle: 'text-lg font-semibold text-white',
    poolCardMuted: 'text-sm text-zinc-400',
    poolCardApr: 'text-xl font-bold text-emerald-400',
    poolCardDlDt: 'text-zinc-500',
    poolCardDlDd: 'font-medium text-zinc-200',
    poolCardBtn:
      'mt-5 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500',
    modalBackdrop: 'absolute inset-0 bg-black/60 backdrop-blur-sm',
    modalPanel:
      'relative w-full max-w-md rounded-2xl border border-zinc-700/80 bg-zinc-900 p-6 shadow-2xl',
    modalTitle: 'text-lg font-semibold text-white',
    modalPoolName: 'font-medium text-white',
    modalDesc: 'mt-1 text-sm text-zinc-400',
    modalLabel: 'block text-sm font-medium text-zinc-300',
    modalInput:
      'mt-1 w-full rounded-xl border border-zinc-600 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40',
    modalAmber: 'text-xs text-amber-200/80',
    modalBtnSecondary:
      'flex-1 rounded-xl border border-zinc-600 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 disabled:opacity-50',
    modalBtnPrimary:
      'flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50',
    footer: 'border-t border-zinc-800 py-6 text-center text-xs text-zinc-600',
    footerDisclaimer: '',
    footerVersion: 'mt-2 text-zinc-500',
    toast:
      'fixed bottom-6 left-1/2 z-[60] max-w-lg -translate-x-1/2 rounded-xl border border-emerald-500/40 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 shadow-2xl',
    badgeEth:
      'bg-indigo-500/15 text-indigo-300 ring-indigo-400/40',
    badgeQday:
      'bg-emerald-500/15 text-emerald-300 ring-emerald-400/40',
  },
  light: {
    shell:
      'min-h-svh bg-gradient-to-b from-zinc-100 via-white to-zinc-100 text-zinc-900',
    header: 'border-b border-zinc-200/90 bg-white/90 backdrop-blur-md',
    headerTitle: 'text-zinc-900',
    headerSubtitle: 'text-zinc-600',
    walletChip:
      'hidden rounded-lg bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700 sm:inline',
    btnDisconnect:
      'rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100',
    btnConnect:
      'rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50',
    btnGhost:
      'rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50',
    rewardsSection:
      'mb-10 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6',
    rewardsLabel: 'text-xs font-medium uppercase tracking-wider text-emerald-700',
    rewardsValue: 'mt-1 font-mono text-3xl font-bold text-zinc-900 md:text-4xl',
    rewardsToken:
      'text-lg font-sans font-semibold text-emerald-700',
    rewardsHint: 'mt-6 text-sm text-zinc-600',
    rewardsCol2:
      'text-left sm:border-l sm:border-emerald-200 sm:pl-10',
    sectionHeading: 'mb-4 text-left text-lg font-semibold text-zinc-900',
    loadingMuted: 'text-left text-zinc-500',
    positionsEmpty:
      'rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-zinc-500',
    tableWrap: 'overflow-x-auto rounded-2xl border border-zinc-200 bg-white/90',
    tableHead: 'border-b border-zinc-200 text-zinc-500',
    tableHeadPending: 'px-4 py-3 font-medium text-emerald-700',
    tableRow:
      'border-b border-zinc-100 last:border-0 hover:bg-emerald-50/40',
    tableCell: 'px-4 py-3 text-zinc-700',
    tableCellWhite: 'px-4 py-3 font-medium text-zinc-900',
    tableCellMuted: 'px-4 py-3 text-zinc-500',
    tableCellPending: 'px-4 py-3 font-mono text-emerald-600',
    tableBtn:
      'rounded-lg border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 disabled:opacity-50',
    poolCard:
      'flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-md transition hover:border-emerald-300 hover:shadow-emerald-100/80',
    poolCardTitle: 'text-lg font-semibold text-zinc-900',
    poolCardMuted: 'text-sm text-zinc-500',
    poolCardApr: 'text-xl font-bold text-emerald-600',
    poolCardDlDt: 'text-zinc-500',
    poolCardDlDd: 'font-medium text-zinc-800',
    poolCardBtn:
      'mt-5 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500',
    modalBackdrop: 'absolute inset-0 bg-zinc-900/40 backdrop-blur-sm',
    modalPanel:
      'relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl',
    modalTitle: 'text-lg font-semibold text-zinc-900',
    modalPoolName: 'font-medium text-zinc-900',
    modalDesc: 'mt-1 text-sm text-zinc-600',
    modalLabel: 'block text-sm font-medium text-zinc-700',
    modalInput:
      'mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-900 placeholder-zinc-400 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40',
    modalAmber: 'text-xs text-amber-800/90',
    modalBtnSecondary:
      'flex-1 rounded-xl border border-zinc-300 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50',
    modalBtnPrimary:
      'flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50',
    footer: 'border-t border-zinc-200 py-6 text-center text-xs text-zinc-500',
    footerDisclaimer: '',
    footerVersion: 'mt-2 text-zinc-400',
    toast:
      'fixed bottom-6 left-1/2 z-[60] max-w-lg -translate-x-1/2 rounded-xl border border-emerald-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-2xl',
    badgeEth:
      'bg-indigo-100 text-indigo-800 ring-indigo-300',
    badgeQday:
      'bg-emerald-100 text-emerald-800 ring-emerald-300',
  },
}

export function useUi(theme: ThemeId) {
  return UI[theme]
}
