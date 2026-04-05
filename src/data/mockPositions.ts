import type { Position } from '../types'

/** 初始模拟持仓 */
export const INITIAL_MOCK_POSITIONS: Position[] = [
  {
    id: 'pos-1',
    poolId: 'eth-stable-pool-1',
    chain: 'ethereum',
    chainLabel: 'ETH',
    lpAmount: '1,204.55',
    valueUsd: '$8,420.00',
    depositedAt: '2026-03-12',
    pendingRewardsQday: '142.8831',
  },
  {
    id: 'pos-2',
    poolId: 'qday-stable-pool',
    chain: 'qday',
    chainLabel: 'QDAY',
    lpAmount: '5,000.00',
    valueUsd: '$2,150.00',
    depositedAt: '2026-03-28',
    pendingRewardsQday: '89.2044',
  },
]
