import { createStore } from 'jotai'
import { describe, expect, it } from 'vitest'

import { DefaultProperties } from '../model/DefaultProperties'
import { Scene } from '../model/Scene'
import { SceneMeta } from '../model/SceneMeta'
import { SpriteData } from '../model/SpriteData'
import { SpriteMeta } from '../model/SpriteMeta'
import { defaultPropertiesState } from './AssetsState'
import {
  isSceneLoadedState,
  isSceneOpenState,
  sceneAbsoluteFilePath,
  sceneAbsolutePathSelector,
  sceneFileDataSelector,
  sceneMetaState,
  sceneNameSelector,
  sceneState,
} from './SceneState'
import { allSpritesState } from './SpritesState'

describe('scene meta selectors', () => {
  it('derive the directory and full file path from the scene meta', () => {
    const store = createStore()

    store.set(sceneMetaState, SceneMeta.create('/maps/level-1.scene'))

    expect(store.get(sceneAbsolutePathSelector)).toBe('/maps')
    expect(store.get(sceneAbsoluteFilePath)).toBe('/maps/level-1.scene')
  })
})

describe('isSceneLoadedState', () => {
  it('is false by default', () => {
    expect(createStore().get(isSceneLoadedState)).toBe(false)
  })

  it('writes the loaded flag without touching the rest of the meta', () => {
    const store = createStore()
    store.set(sceneMetaState, SceneMeta.create('/maps/level-1.scene'))

    store.set(isSceneLoadedState, true)

    expect(store.get(isSceneLoadedState)).toBe(true)
    expect(store.get(sceneMetaState)).toEqual({
      ...SceneMeta.create('/maps/level-1.scene'),
      hasLoaded: true,
    })
  })
})

describe('isSceneOpenState', () => {
  it('is false for the default scene', () => {
    expect(createStore().get(isSceneOpenState)).toBe(false)
  })

  it('is true once a named scene is set', () => {
    const store = createStore()

    store.set(sceneState, { ...Scene.default(), name: 'Level 1' })

    expect(store.get(isSceneOpenState)).toBe(true)
    expect(store.get(sceneNameSelector)).toBe('Level 1')
  })
})

describe('sceneFileDataSelector', () => {
  it('combines the scene, default properties and sprite data', () => {
    const store = createStore()
    const scene = { ...Scene.default(), name: 'Level 1' }
    const defaults = { ...DefaultProperties.default(), opacity: 0.5 }
    const data = { ...SpriteData.default(), id: 'a' }
    store.set(sceneState, scene)
    store.set(defaultPropertiesState, defaults)
    store.set(allSpritesState, { datas: [data], metas: [{ ...SpriteMeta.default(), id: 'a' }] })

    expect(store.get(sceneFileDataSelector)).toEqual({
      ...scene,
      defaultProperties: defaults,
      canvas: { sprites: [data] },
    })
  })
})
