import React from 'react'
import './Section.css'
import { Box, Heading } from 'dracula-ui'
import cx from 'classnames'
interface Props {
  title: string
  children: React.ReactNode
  noPadding?: boolean
}

const Section = ({ title, children, noPadding }: Props): JSX.Element => {
  return (
    <div className="section">
      <Box px="xs" py="xxs">
        <Heading size="xs" color="pink">
          {title}
        </Heading>
      </Box>
      <Box
        px={cx({ xs: !noPadding }) as 'xs' | undefined}
        py={cx({ xxs: !noPadding }) as 'xxs' | undefined}
      >
        {children}
      </Box>
    </div>
  )
}

export default Section
