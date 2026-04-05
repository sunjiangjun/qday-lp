import { useContext } from 'react'
import { AppPreferencesContext, type AppPreferencesValue } from './appPreferencesContext'

export function useAppPreferences(): AppPreferencesValue {
  const ctx = useContext(AppPreferencesContext)
  if (!ctx) {
    throw new Error(
      'useAppPreferences must be used within AppPreferencesProvider',
    )
  }
  return ctx
}
