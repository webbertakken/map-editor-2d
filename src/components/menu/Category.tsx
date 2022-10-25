import React from 'react'
import styles from './Category.module.css'
import { Paragraph } from 'dracula-ui'

interface Props {
  title: string
  children: React.ReactNode
}

const Category = ({ title, children }: Props): JSX.Element => {
  return (
    <div className={styles.category}>
      {title && <Paragraph size="xs">{title}:</Paragraph>}
      {children}
    </div>
  )
}

export default Category
