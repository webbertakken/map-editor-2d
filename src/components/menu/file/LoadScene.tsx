import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal from '../../modal/Modal'
import ExternalLink from '../../atoms/ExternalLink'
import { open } from '@tauri-apps/api/dialog'
import { SCENE_FILE_TYPE_EXTENSION, SCENE_FILE_TYPE_NAME } from '../../../constants'
import { readTextFile } from '@tauri-apps/api/fs'
import { Scene, sceneState } from '../../../model/scene/scene'
import { useRecoilState } from 'recoil'
import { useNotification } from '../../../hooks/useNotification'

class Props {}

const NewScene = ({}: Props): JSX.Element => {
  const [_, setScene] = useRecoilState(sceneState)
  const notify = useNotification()
  const [isOpen, setIsOpen] = React.useState(false)

  const title = 'Load Scene'
  const color = 'orange'

  const openLoadFileDialog = async () => {
    try {
      // Open a selection dialog for image files
      const filePath = await open({
        title: 'Create a new scene',
        multiple: false,
        directory: false,
        filters: [
          {
            name: SCENE_FILE_TYPE_NAME,
            extensions: [SCENE_FILE_TYPE_EXTENSION],
          },
        ],
      })

      // No file chosen
      if (filePath === null || Array.isArray(filePath)) return

      // Load file
      const fileContents = await readTextFile(filePath)

      // Parse file
      const scene = await Scene.fromFile(fileContents)

      // Load in editor
      setScene(scene)

      // Close modal
      setIsOpen(false)

      // Notify user
      notify.success('Scene loaded successfully')
    } catch (error: any) {
      notify.error(error.message)
    }
  }

  return (
    <Modal
      title={title}
      button={(props) => (
        <Button color={color} size="xs" {...props}>
          {title}
        </Button>
      )}
      color={color}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Paragraph>Load a scene file.</Paragraph>
      <Paragraph>All changes are saved automatically.</Paragraph>
      <Paragraph>
        please{' '}
        <ExternalLink
          title="use version control"
          href="https://en.wikipedia.org/wiki/Version_control"
        />{' '}
        or make backups.
      </Paragraph>

      <Button color={color} onClick={openLoadFileDialog}>
        Load Scene File
      </Button>
    </Modal>
  )
}

export default NewScene
