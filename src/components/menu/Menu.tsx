import React from 'react'
import NewScene from './scene/NewScene'
import Category from './Category'
import MenuBar from './MenuBar'
import LoadScene from './scene/LoadScene'
import CloseScene from './scene/CloseScene'
import { useRecoilValue } from 'recoil'
import SelectAssetsPath from './assets/SelectAssetsPath'
import { isSceneLoadedState, isSceneOpenState } from '../../state/SceneState'
import SaveScene from './scene/SaveScene'

interface Props {}

const Menu = ({}: Props): JSX.Element => {
  const isSceneOpen = useRecoilValue(isSceneOpenState)
  const isSceneLoaded = useRecoilValue(isSceneLoadedState)

  return (
    <>
      <MenuBar>
        <Category title="Scene">
          <NewScene />
          <LoadScene />
          <CloseScene />
        </Category>

        {isSceneOpen && isSceneLoaded && (
          <Category title="">
            <SaveScene />
          </Category>
        )}

        {isSceneOpen && isSceneLoaded && (
          <Category title="Assets">
            <SelectAssetsPath />
          </Category>
        )}
      </MenuBar>
    </>
  )
}

export default Menu
