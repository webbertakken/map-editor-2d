import { atom, selector } from 'recoil'
import { App } from '../model/App'

export const appState = atom<App>({
  key: 'app',
  default: App.default(),
})

export const isAutoSaveEnabledSelector = selector({
  key: 'isAutoSaveEnabled',
  get: ({ get }) => get(appState).autoSave,
})
