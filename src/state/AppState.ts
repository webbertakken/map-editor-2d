import { atom } from 'jotai'
import { App } from '../model/App'

export const appState = atom<App>(App.default())

export const isAutoSaveEnabledSelector = atom((get) => get(appState).autoSave)
