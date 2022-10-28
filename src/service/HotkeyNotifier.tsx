import { register, unregisterAll } from '@tauri-apps/api/globalShortcut'
import { v4 as uuidv4 } from 'uuid'
import { createObservable, Observable } from '../core/observable'

export class HotkeyNotifier {
  registry: Map<string, Observable>

  constructor() {
    this.registry = new Map<string, Observable>()
    this.registry.set('copy', createObservable())
    this.registry.set('paste', createObservable())
    this.registry.set('escape', createObservable())
  }

  public async registerListeners() {
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

  public get copy(): Observable | undefined {
    return this.registry.get('copy')
  }

  public get paste(): Observable | undefined {
    return this.registry.get('paste')
  }

  public get escape(): Observable | undefined {
    return this.registry.get('escape')
  }
}
