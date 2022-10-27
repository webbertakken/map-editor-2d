import React from 'react'
import { Button } from 'dracula-ui'
import { useNotification } from '../../hooks/useNotification'

interface Props {
  name: string
  copyText: string
}

const CopyButton = ({ name, copyText }: Props): JSX.Element => {
  const notify = useNotification()

  return (
    <Button
      size="sm"
      color="purple"
      onClick={async () => {
        await notify.promise(navigator.clipboard.writeText(copyText), {
          loading: 'Copying...',
          success: `Copied ${name} to clipboard!`,
          error: `Failed to copy ${name} to clipboard`,
        })
      }}
    >
      📋
    </Button>
  )
}

export default CopyButton
