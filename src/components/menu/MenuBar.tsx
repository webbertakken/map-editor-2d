import React from 'react'
import styles from './MenuBar.module.css'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

const MenuBar = ({ children }: Props): JSX.Element => {
  return <div className={styles.menuBar}>{children}</div>
}

export default MenuBar
