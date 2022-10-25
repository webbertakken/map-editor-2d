import { atom, selector } from 'recoil'
import { SpriteInstance } from '../model/SpriteInstance'

interface CanvasState {
  spriteInstances: SpriteInstance[]
}

export const canvasState = atom<CanvasState>({
  key: 'canvas',
  default: {
    spriteInstances: [],
  },
})

export const spriteInstancesSelector = selector({
  key: 'spriteInstances',
  get: ({ get }) => get(canvasState).spriteInstances,
})
