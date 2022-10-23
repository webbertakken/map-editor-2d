import React from 'react'
import './Layout.css'

interface Props {
  menu: JSX.Element
  left: JSX.Element
  main: JSX.Element
  right: JSX.Element
}

const Layout = ({ menu, left, main, right }: Props): JSX.Element => {
  return (
    <div className="layout">
      <div className="menu">{menu}</div>
      <div className="content">
        <div className="sidebar left">{left}</div>
        <div className="main">{main}</div>
        <div className="sidebar right">{right}</div>
      </div>
    </div>
  )
}

export default Layout
