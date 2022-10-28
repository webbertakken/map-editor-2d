import { register, unregisterAll } from '@tauri-apps/api/globalShortcut'
import { v4 as uuidv4 } from 'uuid'
import { createObservable, Observable } from '../core/observable'
import { listen, TauriEvent } from '@tauri-apps/api/event'

export class HotkeyNotifier {
  events: Map<string, Observable>

  constructor() {
    this.events = new Map<string, Observable>()
    this.events.set('copy', createObservable())
    this.events.set('paste', createObservable())
    this.events.set('escape', createObservable())
  }

  public async registerListeners() {
    // Register
    await listen(TauriEvent.WINDOW_FOCUS, this.register.bind(this))

    // Unregister
    await listen(TauriEvent.WINDOW_BLUR, this.unregister.bind(this))
    await listen(TauriEvent.MENU, this.unregister.bind(this))
  }

  private async register() {
    console.log('registering hotkeys')
    await unregisterAll()
    await register('CommandOrControl+C', () => {
      this.copy?.notify(uuidv4())
    })
    await register('CommandOrControl+V', () => {
      this.paste?.notify(uuidv4())
    })
    await register('Escape', () => {
      this.escape?.notify(uuidv4())
    })
  }

  private async unregister() {
    console.log('unregistering hotkeys')
    await unregisterAll()
  }

  public get copy(): Observable | undefined {
    return this.events.get('copy')
  }

  public get paste(): Observable | undefined {
    return this.events.get('paste')
  }

  public get escape(): Observable | undefined {
    return this.events.get('escape')
  }
}
