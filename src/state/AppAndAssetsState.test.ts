import { createStore } from 'jotai'
import { describe, expect, it } from 'vitest'

import { App } from '../model/App'
import { Assets } from '../model/Assets'
import { appState, isAutoSaveEnabledSelector } from './AppState'
import { areSpritesAssetsLoadedSelector, assetsState, spriteAssetsSelector } from './AssetsState'

describe('isAutoSaveEnabledSelector', () => {
  it('follows the app auto-save setting', () => {
    const store = createStore()

    store.set(appState, { ...App.default(), autoSave: false })
    expect(store.get(isAutoSaveEnabledSelector)).toBe(false)

    store.set(appState, { ...App.default(), autoSave: true })
    expect(store.get(isAutoSaveEnabledSelector)).toBe(true)
  })
})

describe('sprite asset selectors', () => {
  it('expose the sprite assets and whether they have loaded', () => {
    const store = createStore()
    const assets = { ...Assets.default(), sprites: [], areSpritesLoaded: true }

    store.set(assetsState, assets)

    expect(store.get(spriteAssetsSelector)).toBe(assets.sprites)
    expect(store.get(areSpritesAssetsLoadedSelector)).toBe(true)
  })
})
