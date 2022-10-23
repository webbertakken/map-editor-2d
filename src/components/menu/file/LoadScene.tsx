import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal from '../../modal/Modal'
import ExternalLink from '../../atoms/ExternalLink'

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
      <Paragraph>All changes are saved automatically.</Paragraph>
      <Paragraph>
        please{' '}
        <ExternalLink
          title="use version control"
          href="https://en.wikipedia.org/wiki/Version_control"
        />{' '}
        or make backups.
      </Paragraph>

      <Button>Load Scene File</Button>
    </Modal>
  )
}

export default NewScene
