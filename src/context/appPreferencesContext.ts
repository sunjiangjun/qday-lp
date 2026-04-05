import { createContext } from 'react'
import type { Locale, ThemeId } from '../i18n/types'

export type AppPreferencesValue = {
  locale: Locale
  theme: ThemeId
  setLocale: (l: Locale) => void
  setTheme: (t: ThemeId) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

export const AppPreferencesContext =
  createContext<AppPreferencesValue | null>(null)
