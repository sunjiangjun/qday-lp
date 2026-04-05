export const en = {
  app: {
    title: 'QDAY Liquidity',
    subtitlePart1:
      'Provide liquidity on ETH or QDAY; rewards are claimed on',
    subtitlePart2: 'in',
    subtitlePart3: '.',
  },
  header: {
    connectWallet: 'Connect wallet',
    connecting: 'Connecting…',
    disconnect: 'Disconnect',
    themeDark: 'Dark theme',
    themeLight: 'Light theme',
    langZh: '中文',
    langEn: 'English',
  },
  rewards: {
    pending: 'Pending rewards (QDAY)',
    total: 'Total rewards (QDAY)',
    hint: 'Figures drift slightly over time to show accrual.',
  },
  poolList: {
    title: 'Liquidity pools',
    loading: 'Loading pools…',
  },
  positions: {
    title: 'My positions',
    empty:
      'No positions yet. After you add liquidity above, positions appear here.',
    colPool: 'Pool',
    colChain: 'Chain',
    colLp: 'LP amount',
    colValue: 'Value',
    colDate: 'Deposited',
    colPending: 'Pending QDAY',
    rowHint: 'Click a row for details',
  },
  positionDetail: {
    back: 'Back',
    backHome: 'Home',
    notFound: 'Position not found.',
    sectionPool: 'Pool',
    sectionStake: 'Your stake',
    sectionRewards: 'Rewards',
    sectionRedeem: 'Redeem',
    sectionRules: 'Redemption rules',
    redeemHint:
      'Enter LP amount to redeem. Full redemption returns you to the list and removes this position.',
    redeemAmount: 'Amount to redeem (LP)',
    redeemPlaceholder: 'e.g. 100',
    stakeAvailable: 'Staked',
    redeemSubmit: 'Confirm redeem',
    redeeming: 'Processing…',
    invalidAmount: 'Enter a valid amount.',
    exceedsStake: 'Amount cannot exceed your stake.',
    rule1:
      'If the time between redemption and staking is less than 48 hours, a 0.1% fee applies.',
    rule2:
      'If more than 48 hours have passed since staking, no fee is charged.',
  },
  poolCard: {
    tvl: 'TVL',
    desc: 'About',
    apr: 'APR',
    addLiquidity: 'Add liquidity',
  },
  modal: {
    title: 'Add liquidity',
    hint: 'Deposit LP to the pool contract.',
    stakeRulesTitle: 'Staking rules',
    stakeRule1: 'Staking takes effect 8 hours after deposit.',
    stakeRule2:
      'After staking, you receive a staking voucher token.',
    amount: 'Amount',
    placeholder: 'e.g. 1000',
    rewardNote:
      'Rewards are distributed as QDAY on QDAY.',
    availableStake: 'Available to stake',
    gasBalance: 'Gas balance',
    gasLowWarning: 'Insufficient gas. Top up before continuing.',
    cancel: 'Cancel',
    confirm: 'Confirm',
    confirming: 'Confirming…',
    close: 'Close',
  },
  footer: {
    disclaimer:
      'On-chain actions and backend use a test environment. Do not use real funds.',
    versionLabel: 'Version {version}',
  },
  toast: {
    walletConnected: 'Wallet connected',
    connectFirst: 'Connect your wallet first',
  },
  tx: {
    addLiquidity:
      'Added liquidity to “{name}” on {chain} (amount: {amount})',
    removeLiquidity: 'Removed position for {name} from {chain}',
    redeem:
      'Submitted redemption for “{name}” on {chain} (amount: {amount})',
  },
  pools: {
    'eth-stable-pool-1': {
      name: 'Ethereum Stable Pool 1',
      description: 'USDT liquidity',
    },
    'eth-stable-pool-2': {
      name: 'Ethereum Stable Pool 2',
      description: 'USDC liquidity',
    },
    'qday-stable-pool': {
      name: 'QDAY Chain Stable Pool',
      description: 'USD8 liquidity',
    },
  },
} as const
