import { atom, selector } from 'recoil'
import { Scene } from '../model/Scene'
import { SceneMeta } from '../model/SceneMeta'
import { allSpritesState } from './SpritesState'

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

/**
 * Scene itself
 */

export const sceneState = atom<Scene>({
  key: 'scene',
  default: Scene.default(),
})

export const sceneNameSelector = selector({
  key: 'sceneName',
  get: ({ get }) => get(sceneState).name,
})

export const isSceneOpenState = selector({
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
    canvas: {
      sprites: get(allSpritesState).datas,
    },
  }),
})
