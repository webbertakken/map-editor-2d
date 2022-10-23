import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal from '../../modal/Modal'
import ExternalLink from '../../atoms/ExternalLink'
import { open } from '@tauri-apps/api/dialog'
import { SCENE_FILE_TYPE_EXTENSION, SCENE_FILE_TYPE_NAME } from '../../../constants'

class Props {}

const NewScene = ({}: Props): JSX.Element => {
  const title = 'Load Scene'
  const color = 'orange'

  const openLoadFileDialog = async () => {
    // Open a selection dialog for image files
    const selected = await open({
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
    if (selected === null) return

    console.log(selected)
  }

  return (
    <Modal
      color={color}
      button={(props) => (
        <Button color={color} size="xs" {...props}>
          {title}
        </Button>
      )}
      title={title}
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
