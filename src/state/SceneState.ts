import { atom, selector } from 'recoil'
import { Scene } from '../model/Scene'
import { spriteInstancesSelector } from './CanvasState'

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

export const sceneFileDataSelector = selector<Scene>({
  key: 'sceneFileData',
  get: ({ get }) => ({
    ...get(sceneState),
    canvas: {
      sprites: get(spriteInstancesSelector),
    },
  }),
})
