import React, { useEffect } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useAtom } from 'jotai'
import { selectedSpriteIdsState } from '../../../state/SpritesState'
import { useNotification } from '../../../hooks/useNotification'

interface Props {}

const DeselectListener = ({}: Props): React.JSX.Element => {
  const { hotkeys } = React.useContext(AppContext)
  const [selectedSpriteIds, setSelectedSpriteIds] = useAtom(selectedSpriteIdsState)
  const notify = useNotification()

  useEffect(() => {
    hotkeys.escape?.subscribe(onDeselect)
    return () => {
      hotkeys.escape?.unsubscribe(onDeselect)
    }
  })

  const onDeselect = () => {
    if (selectedSpriteIds.length <= 0) return

    setSelectedSpriteIds([])
    notify.success('Deselected')
  }

  return <></>
}

export default DeselectListener
