import React from 'react'
import { Button } from 'dracula-ui'
import { useAtomValue, useSetAtom } from 'jotai'
import { Scene } from '../../../model/Scene'
import { useNotification } from '../../../hooks/useNotification'
import { SceneMeta } from '../../../model/SceneMeta'
import { isSceneOpenState, sceneMetaState, sceneState } from '../../../state/SceneState'
import { Assets } from '../../../model/Assets'
import { assetsState } from '../../../state/AssetsState'
import { allSpritesState } from '../../../state/SpritesState'
import { Sprites } from '../../../model/Sprites'

interface Props {}

const CloseScene = ({}: Props): React.JSX.Element => {
  const setScene = useSetAtom(sceneState)
  const setSceneMeta = useSetAtom(sceneMetaState)
  const setAssets = useSetAtom(assetsState)
  const setSprites = useSetAtom(allSpritesState)
  const notify = useNotification()
  const isSceneOpen = useAtomValue(isSceneOpenState)

  const closeScene = () => {
    // Reset previous scene
    setScene(Scene.default())
    setSceneMeta(SceneMeta.default())
    setAssets(Assets.default())
    setSprites(Sprites.default())
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
