import { atom, atomFamily, CallbackInterface, DefaultValue, selector, selectorFamily } from 'recoil'
import { SpriteData } from '../model/SpriteData'
import { SpriteMeta } from '../model/SpriteMeta'

/**
 * Ids
 */

export const spriteIdsState = atom<string[]>({
  key: 'spriteIds',
  default: [],
})

/**
 * Sprite data
 */

const privateSpriteDatasWithId = atomFamily<SpriteData, string>({
  key: 'spriteDatasPrivate',
  default: SpriteData.default(),
})

export const spriteDatasWithId = selectorFamily<SpriteData, string>({
  key: 'spriteDatas',
  get:
    (id) =>
    ({ get }) =>
      get(privateSpriteDatasWithId(id)),
  set:
    (id) =>
    ({ set }, data) =>
      set(privateSpriteDatasWithId(id), data),
})

/**
 * Sprite meta
 */

const privateSpriteMetasWithId = atomFamily<SpriteMeta, string>({
  key: 'spriteMetasPrivate',
  default: SpriteMeta.default(),
})

export const spriteMetasWithId = selectorFamily<SpriteMeta, string>({
  key: 'spriteMetasWithId',
  get:
    (id) =>
    ({ get }) =>
      get(privateSpriteMetasWithId(id)),
  set:
    (id) =>
    ({ set }, data) =>
      set(privateSpriteMetasWithId(id), data),
})

/**
 * Combined
 */

export const allSpritesState = selector<Sprites>({
  key: 'spriteDatasCollection',
  get: ({ get }) => {
    const ids = get(spriteIdsState)
    const datas = ids.map((id) => get(spriteDatasWithId(id)))
    const metas = ids.map((id) => get(spriteMetasWithId(id)))
    return { datas, metas }
  },
  set: ({ set, reset, get }, sprites) => {
    // Reset on DefaultValue means reset context
    if (sprites instanceof DefaultValue) {
      get(spriteIdsState).forEach((id) => {
        reset(spriteDatasWithId(id))
        reset(spriteMetasWithId(id))
      })
      reset(spriteIdsState)
      return
    }

    const { datas, metas } = sprites
    const ids = datas.map((data) => data.id)
    for (const data of datas) set(spriteDatasWithId(data.id), data)
    for (const meta of metas) set(spriteMetasWithId(meta.id), meta)
    set(spriteIdsState, ids)
  },
})

/**
 * Callbacks
 */

export const addSpriteCallback =
  ({ set }: CallbackInterface) =>
  (id: string, spriteData: SpriteData, spriteMeta: SpriteMeta) => {
    set(spriteIdsState, (ids) => [...ids, id])
    set(spriteDatasWithId(id), spriteData)
    set(spriteMetasWithId(id), spriteMeta)
  }
