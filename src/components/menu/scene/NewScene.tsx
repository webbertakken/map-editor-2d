import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal, { OpenModalButtonProps } from '../../atoms/modal/Modal'
import { save } from '@tauri-apps/api/dialog'
import { writeTextFile } from '@tauri-apps/api/fs'
import { SCENE_FILE_TYPE_EXTENSION, SCENE_FILE_TYPE_NAME } from '../../../constants'
import { Scene } from '../../../model/Scene'
import { useSetAtom } from 'jotai'
import { useNotification } from '../../../hooks/useNotification'
import { SceneMeta } from '../../../model/SceneMeta'
import { isSceneLoadedState, sceneMetaState, sceneState } from '../../../state/SceneState'
import { Path } from '../../../model/Path'
import { Assets } from '../../../model/Assets'
import { assetsState } from '../../../state/AssetsState'
import { allSpritesState } from '../../../state/SpritesState'
import { Sprites } from '../../../model/Sprites'

class Props {}

const NewSceneButton = (props: OpenModalButtonProps) => (
  <Button size="xs" {...props}>
    New
  </Button>
)

const NewScene = ({}: Props): React.JSX.Element => {
  const setScene = useSetAtom(sceneState)
  const setSceneMeta = useSetAtom(sceneMetaState)
  const setAssets = useSetAtom(assetsState)
  const setSprites = useSetAtom(allSpritesState)
  const setHasLoadedScene = useSetAtom(isSceneLoadedState)
  const [isOpen, setIsOpen] = React.useState(false)
  const notify = useNotification()

  const title = 'New'
  const color = 'orange'

  const openCreateFileDialog = async () => {
    try {
      // Select directory to save file in
      const rawFilePath = await save({
        title: 'Create a new scene',
        filters: [
          {
            name: SCENE_FILE_TYPE_NAME,
            extensions: [SCENE_FILE_TYPE_EXTENSION],
          },
        ],
      })

      // No path chosen
      if (rawFilePath === null) return
      const filePath = Path.normalise(rawFilePath)

      // Reset previous scene
      setHasLoadedScene(false)
      setScene(Scene.default())
      setAssets(Assets.default())
      setSprites(Sprites.default())

      // Create new scene
      const newScene = Scene.new()

      // Write to file
      await writeTextFile(filePath, Scene.toFile(newScene))

      // Close modal
      setIsOpen(false)

      // Load in editor
      setScene(newScene)
      setSceneMeta(SceneMeta.create(filePath))
      setHasLoadedScene(true)

      // Notify user
      notify.success('Scene created successfully')
    } catch (error: any) {
      notify.error(error.message)
    }
  }

  return (
    <Modal
      title={title}
      button={NewSceneButton}
      color={color}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Paragraph>Create a scene file.</Paragraph>

      <Paragraph>
        It is recommended to create the scene in the same directory as your sprites, or in the
        parent directory.
      </Paragraph>

      <Paragraph>
        <strong>Note:</strong> all changes are saved automatically.
      </Paragraph>

      <Button onClick={openCreateFileDialog}>Select File Location</Button>
    </Modal>
  )
}

export default NewScene
