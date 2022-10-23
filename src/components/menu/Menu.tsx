import React from 'react'
import NewScene from './scene/NewScene'
import Category from './Category'
import MenuBar from './MenuBar'
import LoadScene from './scene/LoadScene'
import CloseScene from './scene/CloseScene'
import { useRecoilValue } from 'recoil'
import { isSceneOpenState } from '../../model/SceneFile'
import SelectAssetsPath from './assets/SelectAssetsPath'

interface Props {}

const Menu = ({}: Props): JSX.Element => {
  const isSceneOpen = useRecoilValue(isSceneOpenState)

  return (
    <>
      <MenuBar>
        <Category title="Scene">
          <NewScene />
          <LoadScene />
          <CloseScene />
        </Category>

        {isSceneOpen && (
          <Category title="Assets">
            <SelectAssetsPath />
          </Category>
        )}
      </MenuBar>
    </>
  )
}

export default Menu
