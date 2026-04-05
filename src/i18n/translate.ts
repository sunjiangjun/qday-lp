import type { Locale } from './types'
import { en } from './locales/en'
import { zh } from './locales/zh'

const dict = { zh, en } as const

type Messages = typeof zh

function getNested(obj: unknown, path: string[]): unknown {
  let cur: unknown = obj
  for (const p of path) {
    if (cur === null || cur === undefined || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[p]
  }
  return cur
}

export function t(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const path = key.split('.')
  let raw = getNested(dict[locale] as unknown as Messages, path)
  if (typeof raw !== 'string') {
    raw = getNested(dict.zh as unknown as Messages, path)
  }
  if (typeof raw !== 'string') return key
  if (!vars) return raw
  return raw.replace(/\{(\w+)\}/g, (_, name: string) => {
    const v = vars[name]
    return v !== undefined && v !== null ? String(v) : `{${name}}`
  })
}

export function poolCopy(
  locale: Locale,
  poolId: string,
): { name: string; description: string } {
  const pools = dict[locale].pools as Record<
    string,
    { name: string; description: string }
  >
  const p = pools[poolId] ?? (dict.zh.pools as typeof pools)[poolId]
  return p ?? { name: poolId, description: '' }
}
