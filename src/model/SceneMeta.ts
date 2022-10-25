import { atom, selector } from 'recoil'

export class SceneMeta {
  public absolutePath: string = ''

  static default() {
    return {
      absolutePath: '',
      sceneFileName: '',
    }
  }

  static create(fullPathAndFileName: string) {
    const sceneFileName = fullPathAndFileName.replace(/^.*([\\/:])/, '')
    const absolutePath = fullPathAndFileName.replace(sceneFileName, '').replace(/[\\/]+$/, '')

    return {
      ...SceneMeta.default(),
      absolutePath,
      sceneFileName,
    }
  }
}

export const sceneMetaState = atom<SceneMeta>({
  key: 'sceneMeta',
  default: SceneMeta.default(),
})

export const sceneAbsolutePathSelector = selector({
  key: 'sceneAbsolutePath',
  get: ({ get }) => get(sceneMetaState).absolutePath,
})
