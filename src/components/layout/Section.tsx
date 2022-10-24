import React from 'react'
import './Section.module.css'
import { Box, Divider, Heading } from 'dracula-ui'
import cx from 'classnames'
import { dividerColors } from 'dracula-ui/components/Divider/Divider'
import styles from './Section.module.css'

interface Props {
  title: string
  children: React.ReactNode
  noPadding?: boolean
  color: keyof typeof dividerColors
  flexGrow?: number
}

const Section = ({ title, children, noPadding, color, flexGrow = 1 }: Props): JSX.Element => {
  return (
    <div className={styles.section} style={{ flexGrow }}>
      <Box className={styles.header} px="xs" pt="xxs">
        <Heading size="xs" color={color}>
          {title}
        </Heading>
      </Box>

      <Box className={styles.divider} px="sm">
        <Divider color={color} />
      </Box>

      <Box
        className={styles.content}
        px={cx({ xs: !noPadding }) as 'xs' | undefined}
        pb={cx({ xxs: !noPadding }) as 'xxs' | undefined}
      >
        {children}
      </Box>
    </div>
  )
}

export default Section
