import { atom, DefaultValue, selector } from 'recoil'
import { Scene } from '../model/Scene'
import { allSpritesState } from './SpritesState'
import { SceneMeta } from '../model/SceneMeta'
import { defaultPropertiesState } from './AssetsState'

/**
 * Meta information about the scene
 */

export const sceneMetaState = atom<SceneMeta>({
  key: 'sceneMeta',
  default: SceneMeta.default(),
})

export const sceneAbsolutePathSelector = selector({
  key: 'sceneAbsolutePath',
  get: ({ get }) => get(sceneMetaState).absolutePath,
})

export const sceneAbsoluteFilePath = selector({
  key: 'sceneAbsoluteFilePath',
  get: ({ get }) => {
    const path = get(sceneMetaState).absolutePath
    const filename = get(sceneMetaState).sceneFileName

    return `${path}/${filename}`
  },
})

export const isSceneLoadedState = selector<boolean>({
  key: 'hasLoadedScene',
  get: ({ get }) => get(sceneMetaState).hasLoaded,
  set: ({ set, get }, hasLoaded) => {
    set(sceneMetaState, (oldValue) => {
      if (hasLoaded instanceof DefaultValue) {
        return { ...oldValue, hasLoaded: false }
      } else {
        return { ...oldValue, hasLoaded }
      }
    })
  },
})

/**
 * Scene itself
 */

export const sceneState = atom<Scene>({
  key: 'scene',
  default: Scene.default(),
})

export const sceneNameSelector = selector<string>({
  key: 'sceneName',
  get: ({ get }) => get(sceneState).name,
})

export const isSceneOpenState = selector<boolean>({
  key: 'isSceneOpen',
  get: ({ get }) => get(sceneState).name !== Scene.default().name,
})

/**
 * Export
 */

export const sceneFileDataSelector = selector<Scene>({
  key: 'sceneFileData',
  get: ({ get }) => ({
    ...get(sceneState),
    defaultProperties: get(defaultPropertiesState),
    canvas: {
      sprites: get(allSpritesState).datas,
    },
  }),
})
