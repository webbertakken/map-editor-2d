import React, { useEffect } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { deleteSpritesCallback, selectedSpriteIdsState } from '../../../state/SpritesState'
import { useNotification } from '../../../hooks/useNotification'

interface Props {}

const DeleteListener = ({}: Props): JSX.Element => {
  const { hotkeys } = React.useContext(AppContext)
  const selectedSpriteIds = useRecoilValue(selectedSpriteIdsState)
  const notify = useNotification()
  const deleteSprites = useRecoilCallback(deleteSpritesCallback, [])

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
    notify.success(`Deleted ${numberOfSprites} sprite${numberOfSprites > 1 ? 's' : ''}`)
  }

  return <></>
}

export default DeleteListener
