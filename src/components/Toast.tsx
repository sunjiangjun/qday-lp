import type { ThemeId } from '../i18n/types'
import { UI } from '../theme/ui'

export function Toast({
  message,
  visible,
  theme,
}: {
  message: string
  visible: boolean
  theme: ThemeId
}) {
  if (!visible || !message) return null
  return (
    <div className={UI[theme].toast}>{message}</div>
  )
}
