import React from 'react'
import styles from './Layout.module.css'

interface Props {
  children: React.ReactNode
}

const Main = ({ children }: Props): React.JSX.Element => {
  return <div className={styles.main}>{children}</div>
}

export default Main
