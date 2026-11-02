import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ShortcutHandler } from '@tauri-apps/plugin-global-shortcut'

const tauri = vi.hoisted(() => ({
  handlers: new Map<string, ShortcutHandler>(),
  windowListeners: new Map<string, () => Promise<void>>(),
  register: vi.fn(),
  unregisterAll: vi.fn(),
  listen: vi.fn(),
}))

vi.mock('@tauri-apps/plugin-global-shortcut', () => ({
  register: tauri.register,
  unregisterAll: tauri.unregisterAll,
}))
vi.mock('@tauri-apps/api/event', () => ({
  listen: tauri.listen,
  TauriEvent: { WINDOW_FOCUS: 'tauri://focus', WINDOW_BLUR: 'tauri://blur' },
}))

import { HotkeyNotifier } from './HotkeyNotifier'

const press = (shortcut: string, state: 'Pressed' | 'Released') =>
  tauri.handlers.get(shortcut)?.({ shortcut, id: 1, state })

describe('HotkeyNotifier', () => {
  beforeEach(() => {
    tauri.handlers.clear()
    tauri.windowListeners.clear()
    tauri.register.mockReset().mockImplementation(async (shortcut: string, handler) => {
      tauri.handlers.set(shortcut, handler)
    })
    tauri.unregisterAll.mockReset().mockImplementation(async () => tauri.handlers.clear())
    tauri.listen.mockReset().mockImplementation(async (event: string, handler) => {
      tauri.windowListeners.set(event, handler)
    })
  })

  it.each([
    ['copy', 'CommandOrControl+C'],
    ['paste', 'CommandOrControl+V'],
    ['escape', 'Escape'],
    ['delete', 'Delete'],
  ] as const)('notifies %s once per key press', async (hotkey, shortcut) => {
    const notifier = new HotkeyNotifier()
    const listener = vi.fn()
    notifier[hotkey]?.subscribe(listener)
    await notifier.activate()

    press(shortcut, 'Pressed')
    press(shortcut, 'Released')

    expect(listener).toHaveBeenCalledOnce()
    expect(listener).toHaveBeenCalledWith(shortcut, expect.any(String))
  })

  it('releases every shortcut on deactivate', async () => {
    const notifier = new HotkeyNotifier()
    await notifier.activate()

    await notifier.deactivate()

    expect(tauri.handlers.size).toBe(0)
  })

  it('registers shortcuts on window focus and releases them on blur', async () => {
    const notifier = new HotkeyNotifier()
    await notifier.registerListeners()

    await tauri.windowListeners.get('tauri://focus')?.()
    expect(tauri.handlers.size).toBe(4)

    await tauri.windowListeners.get('tauri://blur')?.()
    expect(tauri.handlers.size).toBe(0)
  })
})
