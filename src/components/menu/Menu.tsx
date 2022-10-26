import React from 'react'
import NewScene from './scene/NewScene'
import Category from './Category'
import MenuBar from './MenuBar'
import LoadScene from './scene/LoadScene'
import CloseScene from './scene/CloseScene'
import { useRecoilValue } from 'recoil'
import SelectAssetsPath from './assets/SelectAssetsPath'
import { isSceneOpenState } from '../../state/SceneState'
import SaveScene from './scene/SaveScene'

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

        {/* Todo - Only start saving once scene is initialised */}
        {/*{isSceneOpen && (*/}
        {/*  <Category title="">*/}
        {/*    <SaveScene />*/}
        {/*  </Category>*/}
        {/*)}*/}

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
