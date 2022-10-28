import React, { useEffect } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useRecoilState } from 'recoil'
import { selectedSpriteIdsState } from '../../../state/SpritesState'
import { useNotification } from '../../../hooks/useNotification'

interface Props {}

const DeselectListener = ({}: Props): JSX.Element => {
  const { hotkeys } = React.useContext(AppContext)
  const [selectedSpriteIds, setSelectedSpriteIds] = useRecoilState(selectedSpriteIdsState)
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
    notify.success('Deselected all sprites')
  }

  return <></>
}

export default DeselectListener
