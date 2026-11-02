import { register, ShortcutEvent, unregisterAll } from '@tauri-apps/plugin-global-shortcut'
import { v4 as uuidv4 } from 'uuid'
import { createObservable, Observable } from '../core/observable'
import { listen, TauriEvent } from '@tauri-apps/api/event'

type Hotkey = string

export class HotkeyNotifier {
  events: Map<string, Observable<Hotkey>>

  constructor() {
    this.events = new Map()
    this.events.set('copy', createObservable())
    this.events.set('paste', createObservable())
    this.events.set('escape', createObservable())
    this.events.set('delete', createObservable())
  }

  public async activate() {
    await this.register()
  }

  public async deactivate() {
    await this.unregister()
  }

  public async registerListeners() {
    // Register
    await listen(TauriEvent.WINDOW_FOCUS, this.register.bind(this))

    // Unregister
    await listen(TauriEvent.WINDOW_BLUR, this.unregister.bind(this))
  }

  private async register() {
    await unregisterAll()
    await register('CommandOrControl+C', this.onPress(this.copy))
    await register('CommandOrControl+V', this.onPress(this.paste))
    await register('Escape', this.onPress(this.escape))
    await register('Delete', this.onPress(this.delete))
  }

  private onPress(observable: Observable<Hotkey> | undefined) {
    return ({ shortcut, state }: ShortcutEvent) => {
      if (state === 'Pressed') observable?.notify(shortcut, uuidv4())
    }
  }

  private async unregister() {
    await unregisterAll()
  }

  public get copy(): Observable<Hotkey> | undefined {
    return this.events.get('copy')
  }

  public get paste(): Observable<Hotkey> | undefined {
    return this.events.get('paste')
  }

  public get escape(): Observable<Hotkey> | undefined {
    return this.events.get('escape')
  }

  public get delete(): Observable<Hotkey> | undefined {
    return this.events.get('delete')
  }
}
