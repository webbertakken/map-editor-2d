import React from 'react'
import styles from './Layout.module.css'

interface Props {
  menu: JSX.Element
  children: React.ReactNode
}

const Layout = ({ menu, children }: Props): JSX.Element => {
  return (
    <div className={styles.layout}>
      <div className={styles.menu}>{menu}</div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Layout
