import React from 'react'
import './Layout.css'
import './Sidebar.css'
import './Section.css'

interface Props {
  menu: JSX.Element
  children: React.ReactNode
}

const Layout = ({ menu, children }: Props): JSX.Element => {
  return (
    <div className="layout">
      <div className="menu">{menu}</div>
      <div className="content">{children}</div>
    </div>
  )
}

export default Layout
