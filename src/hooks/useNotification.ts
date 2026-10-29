import toast from 'react-hot-toast'

const { success, error, loading, promise, dismiss, remove, custom } = toast
const notification = { success, error, loading, promise, dismiss, remove, custom } as const

/**
 * Requires <Toaster /> to be included in the root of the app.
 */
export function useNotification() {
  return notification
}
