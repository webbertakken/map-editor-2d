import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppContext } from '../../context/AppContext'
import {
  allSpritesState,
  copiedSpritesState,
  selectedSpriteIdsState,
  selectedSpritesState,
} from '../../state/SpritesState'
import { v4 as uuidv4 } from 'uuid'

interface Props {}

const CopyAndPaste = ({}: Props): JSX.Element => {
  const { hotkeys } = React.useContext(AppContext)
  const [_1, setAllSprites] = useRecoilState(allSpritesState)
  const [_2, setSelectedSpriteIds] = useRecoilState(selectedSpriteIdsState)
  const [copiedSprites, setCopiedSprites] = useRecoilState(copiedSpritesState)
  const selectedSprites = useRecoilValue(selectedSpritesState)

  useEffect(() => {
    hotkeys.copy?.subscribe(onCopy)
    hotkeys.paste?.subscribe(onPaste)
    return () => {
      hotkeys.copy?.unsubscribe(onCopy)
      hotkeys.paste?.unsubscribe(onPaste)
    }
  })

  const onCopy = () => {
    setCopiedSprites(selectedSprites)
  }

  const onPaste = () => {
    if (copiedSprites.datas.length === 0) return

    // Generate new IDs
    const newIds = new Map<string, string>()
    copiedSprites.datas.forEach((spriteData) => newIds.set(spriteData.id, uuidv4()))

    // Create collection of copied sprites
    const uniquelyCopiedSprites: Sprites = {
      datas: copiedSprites.datas.map((d) => ({ ...d, id: newIds.get(d.id) as string })),
      metas: copiedSprites.metas.map((m) => ({ ...m, id: newIds.get(m.id) as string })),
    }

    // Add the new copies to state
    setAllSprites((allSprites) => ({
      datas: [...allSprites.datas, ...uniquelyCopiedSprites.datas],
      metas: [...allSprites.metas, ...uniquelyCopiedSprites.metas],
    }))

    // Select the new copies
    setSelectedSpriteIds(uniquelyCopiedSprites.datas.map((d) => d.id))
  }

  return <></>
}

export default CopyAndPaste
