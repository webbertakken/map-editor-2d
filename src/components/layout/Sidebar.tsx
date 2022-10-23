import React from 'react'
import cx from 'classnames'

interface Props {
  left?: boolean
  right?: boolean
  children: React.ReactNode
}

const Sidebar = ({ left, right, children }: Props): JSX.Element => {
  return <div className={cx('sidebar', { right, left })}>{children}</div>
}

export default Sidebar
