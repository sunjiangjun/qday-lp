import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale, ThemeId } from '../i18n/types'
import { t } from '../i18n/translate'
import { AppPreferencesContext } from './appPreferencesContext'

const STORAGE_LOCALE = 'lpm-locale'
const STORAGE_THEME = 'lpm-theme'

function readStoredLocale(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_LOCALE)
    if (v === 'en' || v === 'zh') return v
  } catch {
    /* ignore */
  }
  return 'zh'
}

function readStoredTheme(): ThemeId {
  try {
    const v = localStorage.getItem(STORAGE_THEME)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* ignore */
  }
  return 'dark'
}

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale())
  const [theme, setThemeState] = useState<ThemeId>(() => readStoredTheme())

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_LOCALE, l)
    } catch {
      /* ignore */
    }
  }, [])

  const setTheme = useCallback((th: ThemeId) => {
    setThemeState(th)
    try {
      localStorage.setItem(STORAGE_THEME, th)
    } catch {
      /* ignore */
    }
  }, [])

  const translate = useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      t(locale, key, vars),
    [locale],
  )

  const value = useMemo(
    () => ({
      locale,
      theme,
      setLocale,
      setTheme,
      t: translate,
    }),
    [locale, theme, setLocale, setTheme, translate],
  )

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  )
}
