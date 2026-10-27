import { atom } from 'jotai'
import { Assets } from '../model/Assets'
import { DefaultProperties } from '../model/DefaultProperties'

export const assetsState = atom<Assets>(Assets.default())

export const spriteAssetsSelector = atom((get) => get(assetsState).sprites)

export const areSpritesAssetsLoadedSelector = atom((get) => get(assetsState).areSpritesLoaded)

export const defaultPropertiesState = atom<DefaultPropertiesProps>(DefaultProperties.default())
