import React from 'react'
import cx from 'classnames'
import styles from './Sidebar.module.css'

interface Props {
  left?: boolean
  right?: boolean
  children: React.ReactNode
}

const Sidebar = ({ left, right, children }: Props): JSX.Element => {
  return (
    <div className={cx(styles.sidebar, { [styles.right]: right, [styles.left]: left })}>
      {children}
    </div>
  )
}

export default Sidebar
