import { atom, selector } from 'recoil'
import { Assets } from '../model/Assets'

export const assetsState = atom<Assets>({
  key: 'assets',
  default: Assets.default(),
})

export const spriteAssetsSelector = selector({
  key: 'spritesAssets',
  get: ({ get }) => get(assetsState).sprites,
})

export const areSpritesAssetsLoadedSelector = selector({
  key: 'areSpriteAssetsLoaded',
  get: ({ get }) => get(assetsState).areSpritesLoaded,
})
