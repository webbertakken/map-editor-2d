import React from 'react'
import ReactModal from 'react-modal'
import { Heading, Button as DraculaButton, Box, Divider, DividerProps } from 'dracula-ui'
import styles from './Modale.module.css'
import { dividerColors } from 'dracula-ui/components/Divider/Divider'

const customStyles = {
  content: {
    minWidth: '300px',
    maxWidth: '600px',
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -25%)',
  },
}

interface Props {
  button: (props: any) => JSX.Element
  title: string
  children: React.ReactNode
  color?: keyof typeof dividerColors
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Modal = ({
  button: Button,
  title,
  isOpen,
  setIsOpen,
  children,
  color = 'purple',
}: Props): JSX.Element => {
  let subtitle: HTMLHeadingElement | null

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // if (subtitle) subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <Button onClick={openModal} />
      <ReactModal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={title}
      >
        <div className={styles.header}>
          <Heading>{title}</Heading>
          <DraculaButton color="greySecondary" size="xs" onClick={closeModal}>
            <span style={{ fontSize: '175%' }}>×</span>
          </DraculaButton>
        </div>
        <Box my="sm">
          <Divider color={color} />
        </Box>
        <div className={styles.body}>{children}</div>
      </ReactModal>
    </div>
  )
}

export default Modal
