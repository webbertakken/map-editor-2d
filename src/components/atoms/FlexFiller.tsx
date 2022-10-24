import React from 'react'

interface Props {
  flexGrow?: number
}

/**
 * Used to fill up the rest of the space in a flexbox.
 */
const FlexFiller = ({ flexGrow = 1 }: Props): JSX.Element => {
  return <div style={{ flexGrow }} />
}

export default FlexFiller
