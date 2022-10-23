import React from 'react'
import './Section.css'
import { Box, Divider, Heading } from 'dracula-ui'
import cx from 'classnames'
import { dividerColors } from 'dracula-ui/components/Divider/Divider'

interface Props {
  title: string
  children: React.ReactNode
  noPadding?: boolean
  color: keyof typeof dividerColors
}

const Section = ({ title, children, noPadding, color }: Props): JSX.Element => {
  return (
    <div className="section">
      <Box px="xs" pt="xxs">
        <Heading size="xs" color={color}>
          {title}
        </Heading>
      </Box>

      <Box px="sm" style={{ opacity: 0.5 }}>
        <Divider color={color} />
      </Box>

      <Box
        px={cx({ xs: !noPadding }) as 'xs' | undefined}
        pb={cx({ xxs: !noPadding }) as 'xxs' | undefined}
      >
        {children}
      </Box>
    </div>
  )
}

export default Section
