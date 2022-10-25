import { atom, selector } from 'recoil'
import { SceneFile } from '../model/SceneFile'
import { spriteInstancesSelector } from './CanvasState'

export const sceneState = atom<SceneFile>({
  key: 'scene',
  default: SceneFile.default(),
})

export const sceneNameSelector = selector({
  key: 'sceneName',
  get: ({ get }) => get(sceneState).name,
})

export const isSceneOpenState = selector({
  key: 'isSceneOpen',
  get: ({ get }) => get(sceneState).name !== SceneFile.default().name,
})

export const sceneFileDataSelector = selector<SceneFile>({
  key: 'sceneFileData',
  get: ({ get }) => ({
    ...get(sceneState),
    canvas: {
      sprites: get(spriteInstancesSelector),
    },
  }),
})
