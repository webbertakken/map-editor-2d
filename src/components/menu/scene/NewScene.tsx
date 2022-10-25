import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal from '../../modal/Modal'
import { save } from '@tauri-apps/api/dialog'
import { writeTextFile } from '@tauri-apps/api/fs'
import { SCENE_FILE_TYPE_EXTENSION, SCENE_FILE_TYPE_NAME } from '../../../constants'
import { SceneFile } from '../../../model/SceneFile'
import { useRecoilState } from 'recoil'
import { useNotification } from '../../../hooks/useNotification'
import { SceneMeta, sceneMetaState } from '../../../model/SceneMeta'
import { sceneState } from '../../../state/SceneState'

class Props {}

const NewScene = ({}: Props): JSX.Element => {
  const [_1, setScene] = useRecoilState(sceneState)
  const [_2, setSceneMeta] = useRecoilState(sceneMetaState)
  const [isOpen, setIsOpen] = React.useState(false)
  const notify = useNotification()

  const title = 'New'
  const color = 'orange'

  const openCreateFileDialog = async () => {
    try {
      // Select directory to save file in
      const filePath = await save({
        title: 'Create a new scene',
        filters: [
          {
            name: SCENE_FILE_TYPE_NAME,
            extensions: [SCENE_FILE_TYPE_EXTENSION],
          },
        ],
      })

      // No path chosen
      if (filePath === null) return

      // Create new scene
      const newScene = SceneFile.new()

      // Write to file
      await writeTextFile(filePath, SceneFile.toFile(newScene))

      // Load in editor
      setScene(newScene)
      setSceneMeta(SceneMeta.create(filePath))

      // Close modal
      setIsOpen(false)

      // Notify user
      notify.success('Scene created successfully')
    } catch (error: any) {
      notify.error(error.message)
    }
  }

  return (
    <Modal
      title={title}
      button={(props) => (
        <Button size="xs" {...props}>
          {title}
        </Button>
      )}
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
