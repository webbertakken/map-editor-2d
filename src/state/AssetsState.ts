import { atom, selector } from 'recoil'
import { Assets } from '../model/Assets'
import { DefaultProperties } from '../model/DefaultProperties'

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

export const defaultPropertiesState = atom<DefaultPropertiesProps>({
  key: 'defaultProperties',
  default: DefaultProperties.default(),
})
