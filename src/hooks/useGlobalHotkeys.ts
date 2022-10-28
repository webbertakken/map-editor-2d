import { useContext, useEffect, useState } from 'react'
import { AppContext, AppContextProps } from '../context/AppContext'

/**
 * Requires <AppContext.Provider /> to be included in the root of the app.
 */
export function useGlobalHotkeys() {
  const { hotkeys } = useContext<AppContextProps>(AppContext)
  const [active, setActive] = useState(false)

  const activate = () => setActive(true)
  const deactivate = () => setActive(false)

  useEffect(() => {
    active ? hotkeys.activate() : hotkeys.deactivate()
  }, [active])

  return [activate, deactivate, active] as const
}
