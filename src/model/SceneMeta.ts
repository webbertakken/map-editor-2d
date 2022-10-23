import { atom, selector } from 'recoil'

export class SceneMeta {
  public path: string = ''

  static default() {
    return {
      path: '',
    }
  }

  static create(filePath: string) {
    return {
      ...SceneMeta.default(),
      path: filePath,
    }
  }
}

export const sceneMetaState = atom<SceneMeta>({
  key: 'sceneMeta',
  default: SceneMeta.default(),
})

export const scenePathSelector = selector({
  key: 'scenePath',
  get: ({ get }) => get(sceneMetaState).path,
})
