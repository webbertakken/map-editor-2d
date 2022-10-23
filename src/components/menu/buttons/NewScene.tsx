import React from 'react'
import { Button } from 'dracula-ui'
import Modal from '../../modal/Modal'

class Props {}

const NewScene = ({}: Props): JSX.Element => {
  const title = 'New Scene'
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
      Content
    </Modal>
  )
}

export default NewScene
