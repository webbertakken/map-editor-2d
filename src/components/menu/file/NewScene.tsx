import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal from '../../modal/Modal'
import { save, message } from '@tauri-apps/api/dialog'
import { writeTextFile } from '@tauri-apps/api/fs'

class Props {}

const tempFile = {
  name: 'Untitled',
}

const NewScene = ({}: Props): JSX.Element => {
  const title = 'New Scene'
  const color = 'orange'

  const openCreateFileDialog = async () => {
    const filePath = await save({
      title: 'Create a new scene',
      // defaultPath:
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
    await writeTextFile(filePath, JSON.stringify(tempFile, null, 2))

    // Auto-save notice
    await message('Note: all changes to your scene will automatically be saved', 'Tauri')

    // Todo - tell global state that a file is opened
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
        It is recommended to create the scene in the same directory as your sprites, or the parent
        directory.
      </Paragraph>

      <Button onClick={openCreateFileDialog}>Select file location</Button>
    </Modal>
  )
}

export default NewScene
