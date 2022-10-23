import React from 'react'
import NewScene from './buttons/NewScene'
import Category from './Category'
import MenuBar from './MenuBar'
import LoadScene from './buttons/LoadScene'

interface Props {}

const Menu = ({}: Props): JSX.Element => {
  return (
    <>
      <MenuBar>
        <Category title="File">
          <NewScene />
          <LoadScene />
        </Category>
      </MenuBar>
    </>
  )
}

export default Menu
