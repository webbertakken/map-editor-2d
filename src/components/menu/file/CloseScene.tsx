import React from 'react'
import { Button } from 'dracula-ui'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isSceneOpenState, Scene, sceneState } from '../../../model/scene/scene'
import { useNotification } from '../../../hooks/useNotification'

interface Props {}

const CloseScene = ({}: Props): JSX.Element => {
  const [_, setScene] = useRecoilState(sceneState)
  const notify = useNotification()
  const isSceneOpen = useRecoilValue(isSceneOpenState)

  const closeScene = () => {
    setScene(Scene.default())

    notify.success('Scene closed')
  }

  return (
    <div>
      <Button size="xs" color="purple" disabled={!isSceneOpen} onClick={closeScene}>
        Close
      </Button>
    </div>
  )
}

export default CloseScene
