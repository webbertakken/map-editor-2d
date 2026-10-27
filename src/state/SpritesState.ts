import { atom, type SetStateAction } from 'jotai'
import { atomFamily } from 'jotai-family'
import { SpriteData } from '../model/SpriteData'
import { SpriteMeta } from '../model/SpriteMeta'

/**
 * Ids
 */

export const spriteIdsState = atom<string[]>([])

export const selectedSpriteIdsState = atom<string[]>([])

/**
 * Sprite data and meta, one atom per sprite id
 */

export const spriteDatasWithId = atomFamily((_id: string) => atom<SpriteData>(SpriteData.default()))

export const spriteMetasWithId = atomFamily((_id: string) => atom<SpriteMeta>(SpriteMeta.default()))

/**
 * Combined
 */

export const allSpritesState = atom(
  (get): Sprites => {
    const ids = get(spriteIdsState)
    const datas = ids.map((id) => get(spriteDatasWithId(id)))
    const metas = ids.map((id) => get(spriteMetasWithId(id)))
    return { datas, metas }
  },
  (get, set, update: SetStateAction<Sprites>) => {
    const { datas, metas } = typeof update === 'function' ? update(get(allSpritesState)) : update
    for (const data of datas) set(spriteDatasWithId(data.id), data)
    for (const meta of metas) set(spriteMetasWithId(meta.id), meta)
    set(
      spriteIdsState,
      datas.map((data) => data.id),
    )
  },
)

export const copiedSpritesState = atom<Sprites>({
  metas: [],
  datas: [],
})

export const selectedSpritesState = atom((get): Sprites => {
  const ids = get(selectedSpriteIdsState)
  const datas = ids.map((id) => get(spriteDatasWithId(id)))
  const metas = ids.map((id) => get(spriteMetasWithId(id)))
  return { datas, metas }
})

/**
 * Actions
 */

export const addSpriteAction = atom(
  null,
  (_get, set, id: string, spriteData: SpriteData, spriteMeta: SpriteMeta) => {
    set(spriteIdsState, (ids) => [...ids, id])
    set(spriteDatasWithId(id), spriteData)
    set(spriteMetasWithId(id), spriteMeta)
  },
)

export const deleteSpritesAction = atom(null, (_get, set, ids: string[]) => {
  set(allSpritesState, (allSprites) => ({
    datas: allSprites.datas.filter((data) => !ids.includes(data.id)),
    metas: allSprites.metas.filter((meta) => !ids.includes(meta.id)),
  }))
})
