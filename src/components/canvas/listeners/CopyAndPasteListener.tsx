import React, { useEffect } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { AppContext } from '../../../context/AppContext'
import {
  allSpritesState,
  copiedSpritesState,
  selectedSpriteIdsState,
  selectedSpritesState,
} from '../../../state/SpritesState'
import { v4 as uuidv4 } from 'uuid'
import { useNotification } from '../../../hooks/useNotification'

interface Props {}

const CopyAndPasteListener = ({}: Props): React.JSX.Element => {
  const { hotkeys } = React.useContext(AppContext)
  const setAllSprites = useSetAtom(allSpritesState)
  const setSelectedSpriteIds = useSetAtom(selectedSpriteIdsState)
  const [copiedSprites, setCopiedSprites] = useAtom(copiedSpritesState)
  const selectedSprites = useAtomValue(selectedSpritesState)
  const notify = useNotification()

  const onCopy = () => {
    const numberOfSprites = selectedSprites.datas.length
    if (numberOfSprites <= 0) return

    setCopiedSprites(selectedSprites)
    notify.success(`Copied ${numberOfSprites} sprite${numberOfSprites > 1 ? 's' : ''}`)
  }

  const onPaste = () => {
    const numberOfSprites = copiedSprites.datas.length
    if (numberOfSprites <= 0) return

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

    notify.success(`Pasted ${numberOfSprites} sprite${numberOfSprites > 1 ? 's' : ''}`)
  }

  useEffect(() => {
    hotkeys.copy?.subscribe(onCopy)
    hotkeys.paste?.subscribe(onPaste)
    return () => {
      hotkeys.copy?.unsubscribe(onCopy)
      hotkeys.paste?.unsubscribe(onPaste)
    }
  })

  return <></>
}

export default CopyAndPasteListener
