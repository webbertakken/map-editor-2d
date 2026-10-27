import React, { useEffect } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useAtom, useSetAtom } from 'jotai'
import { deleteSpritesAction, selectedSpriteIdsState } from '../../../state/SpritesState'
import { useNotification } from '../../../hooks/useNotification'

interface Props {}

const DeleteListener = ({}: Props): React.JSX.Element => {
  const { hotkeys } = React.useContext(AppContext)
  const [selectedSpriteIds, setSelectedSpriteIds] = useAtom(selectedSpriteIdsState)
  const notify = useNotification()
  const deleteSprites = useSetAtom(deleteSpritesAction)

  useEffect(() => {
    hotkeys.delete?.subscribe(onDelete)
    return () => {
      hotkeys.delete?.unsubscribe(onDelete)
    }
  })

  const onDelete = () => {
    const numberOfSprites = selectedSpriteIds.length
    if (numberOfSprites <= 0) return

    deleteSprites(selectedSpriteIds)
    setSelectedSpriteIds([])
    notify.success(`Deleted ${numberOfSprites} sprite${numberOfSprites > 1 ? 's' : ''}`)
  }

  return <></>
}

export default DeleteListener
