import React from 'react'
import { Box } from 'dracula-ui'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

const FormRow = ({ children }: Props): React.JSX.Element => {
  return <Box style={{ display: 'flex', alignItems: 'baseline', gap: '.5em' }}>{children}</Box>
}

export default FormRow
