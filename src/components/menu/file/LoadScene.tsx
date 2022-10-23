import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal from '../../modal/Modal'

class Props {}

const NewScene = ({}: Props): JSX.Element => {
  const title = 'Load Scene'
  const color = 'orange'

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
      <Paragraph>Load a scene file.</Paragraph>
      <Paragraph>
        Note: all changes are automatically saved. Recommend keeping backups or using version
        control for your scene files.
      </Paragraph>
    </Modal>
  )
}

export default NewScene
