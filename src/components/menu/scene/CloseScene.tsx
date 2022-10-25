import React from 'react'
import { Button } from 'dracula-ui'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Scene } from '../../../model/Scene'
import { useNotification } from '../../../hooks/useNotification'
import { SceneMeta } from '../../../model/SceneMeta'
import { isSceneOpenState, sceneMetaState, sceneState } from '../../../state/SceneState'
import { canvasSpritesState } from '../../../state/CanvasState'

interface Props {}

const CloseScene = ({}: Props): JSX.Element => {
  const [_1, setScene] = useRecoilState(sceneState)
  const [_2, setSceneMeta] = useRecoilState(sceneMetaState)
  const [_3, setSprites] = useRecoilState(canvasSpritesState)
  const notify = useNotification()
  const isSceneOpen = useRecoilValue(isSceneOpenState)

  const closeScene = () => {
    setScene(Scene.default())
    setSceneMeta(SceneMeta.default())
    setSprites([])

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
