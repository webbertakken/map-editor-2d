import { atom } from 'jotai'
import { Scene } from '../model/Scene'
import { allSpritesState } from './SpritesState'
import { SceneMeta } from '../model/SceneMeta'
import { defaultPropertiesState } from './AssetsState'

/**
 * Meta information about the scene
 */

export const sceneMetaState = atom<SceneMeta>(SceneMeta.default())

export const sceneAbsolutePathSelector = atom((get) => get(sceneMetaState).absolutePath)

export const sceneAbsoluteFilePath = atom((get) => {
  const { absolutePath, sceneFileName } = get(sceneMetaState)

  return `${absolutePath}/${sceneFileName}`
})

export const isSceneLoadedState = atom(
  (get) => get(sceneMetaState).hasLoaded,
  (_get, set, hasLoaded: boolean) => {
    set(sceneMetaState, (oldValue) => ({ ...oldValue, hasLoaded }))
  },
)

/**
 * Scene itself
 */

export const sceneState = atom<Scene>(Scene.default())

export const sceneNameSelector = atom((get) => get(sceneState).name)

export const isSceneOpenState = atom((get) => get(sceneState).name !== Scene.default().name)

/**
 * Export
 */

export const sceneFileDataSelector = atom<Scene>((get) => ({
  ...get(sceneState),
  defaultProperties: get(defaultPropertiesState),
  canvas: {
    sprites: get(allSpritesState).datas,
  },
}))
