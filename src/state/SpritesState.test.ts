import { createStore } from 'jotai'
import { describe, expect, it } from 'vitest'

import { SpriteData } from '../model/SpriteData'
import { SpriteMeta } from '../model/SpriteMeta'
import {
  addSpriteAction,
  allSpritesState,
  deleteSpritesAction,
  selectedSpriteIdsState,
  selectedSpritesState,
  spriteDatasWithId,
  spriteIdsState,
  spriteMetasWithId,
} from './SpritesState'

const spriteData = (id: string): SpriteData => ({ ...SpriteData.default(), id, relativePath: id })
const spriteMeta = (id: string): SpriteMeta => ({ ...SpriteMeta.default(), id, name: id })
const sprites = (...ids: string[]): Sprites => ({
  datas: ids.map(spriteData),
  metas: ids.map(spriteMeta),
})

describe('spriteDatasWithId and spriteMetasWithId', () => {
  it('default to an empty sprite for an unknown id', () => {
    const store = createStore()

    expect(store.get(spriteDatasWithId('unknown'))).toEqual(SpriteData.default())
    expect(store.get(spriteMetasWithId('unknown'))).toEqual(SpriteMeta.default())
  })

  it('return the same atom for the same id', () => {
    expect(spriteDatasWithId('a')).toBe(spriteDatasWithId('a'))
    expect(spriteMetasWithId('a')).toBe(spriteMetasWithId('a'))
  })
})

describe('allSpritesState', () => {
  it('is empty by default', () => {
    const store = createStore()

    expect(store.get(allSpritesState)).toEqual({ datas: [], metas: [] })
  })

  it('stores every sprite under its id and keeps their order', () => {
    const store = createStore()

    store.set(allSpritesState, sprites('a', 'b'))

    expect(store.get(spriteIdsState)).toEqual(['a', 'b'])
    expect(store.get(spriteDatasWithId('b'))).toEqual(spriteData('b'))
    expect(store.get(spriteMetasWithId('b'))).toEqual(spriteMeta('b'))
    expect(store.get(allSpritesState)).toEqual(sprites('a', 'b'))
  })

  it('accepts an updater derived from the current sprites', () => {
    const store = createStore()
    store.set(allSpritesState, sprites('a'))

    store.set(allSpritesState, (current) => ({
      datas: [...current.datas, spriteData('b')],
      metas: [...current.metas, spriteMeta('b')],
    }))

    expect(store.get(allSpritesState)).toEqual(sprites('a', 'b'))
  })

  it('replaces the previous sprites', () => {
    const store = createStore()
    store.set(allSpritesState, sprites('a', 'b'))

    store.set(allSpritesState, sprites('c'))

    expect(store.get(allSpritesState)).toEqual(sprites('c'))
  })
})

describe('selectedSpritesState', () => {
  it('holds only the selected sprites, in selection order', () => {
    const store = createStore()
    store.set(allSpritesState, sprites('a', 'b', 'c'))

    store.set(selectedSpriteIdsState, ['c', 'a'])

    expect(store.get(selectedSpritesState)).toEqual(sprites('c', 'a'))
  })
})

describe('addSpriteAction', () => {
  it('appends a sprite with its data and meta', () => {
    const store = createStore()
    store.set(allSpritesState, sprites('a'))

    store.set(addSpriteAction, 'b', spriteData('b'), spriteMeta('b'))

    expect(store.get(allSpritesState)).toEqual(sprites('a', 'b'))
  })
})

describe('deleteSpritesAction', () => {
  it('removes only the given sprites', () => {
    const store = createStore()
    store.set(allSpritesState, sprites('a', 'b', 'c'))

    store.set(deleteSpritesAction, ['a', 'c'])

    expect(store.get(allSpritesState)).toEqual(sprites('b'))
  })

  it('leaves the sprites unchanged for unknown ids', () => {
    const store = createStore()
    store.set(allSpritesState, sprites('a'))

    store.set(deleteSpritesAction, ['unknown'])

    expect(store.get(allSpritesState)).toEqual(sprites('a'))
  })
})
