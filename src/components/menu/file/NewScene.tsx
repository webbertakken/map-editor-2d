import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal from '../../modal/Modal'
import { save } from '@tauri-apps/api/dialog'
import { writeTextFile } from '@tauri-apps/api/fs'

class Props {}

const newFile = {
  name: 'Untitled',
  version: 0.1,
  description:
    "Generated using Webber's Map Editor 2D. See https://github.com/webbertakken/map-editor-2d for more details.",
}

const NewScene = ({}: Props): JSX.Element => {
  const title = 'New Scene'
  const color = 'orange'

  const openCreateFileDialog = async () => {
    // Select directory to save file in
    const filePath = await save({
      title: 'Create a new scene',
      filters: [
        {
          name: '2D Map Editor Scene',
          extensions: ['2dtf'],
        },
      ],
    })

    // No path chosen
    if (filePath === null) return

    // Write file
    await writeTextFile(filePath, JSON.stringify(newFile, null, 2))
  }

  return (
    <Modal
      color={color}
      button={(props) => (
        <Button size="xs" {...props}>
          {title}
        </Button>
      )}
      title={title}
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
