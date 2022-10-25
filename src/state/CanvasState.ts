import { atom } from 'recoil'
import { CanvasSpriteData } from '../model/CanvasSpriteData'

export const canvasSpritesState = atom<CanvasSpriteData[]>({
  key: 'canvasSpritesState',
  default: [],
})
