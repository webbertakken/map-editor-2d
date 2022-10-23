import React from 'react'
import { Button, Heading } from 'dracula-ui'
import { useNotification } from '../../hooks/useNotification'

interface Props {}

const Menu = ({}: Props): JSX.Element => {
  const notify = useNotification()

  const click = () => {
    notify.success('Hello')
  }

  return (
    <div>
      <Button onClick={click} />
    </div>
  )
}

export default Menu
