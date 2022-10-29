import React from 'react'
import FlexFiller from '../atoms/FlexFiller'
import { SceneSection } from './scenes/SceneSection'
import { SpritesSection } from './assets/SpritesSection'
import DefaultPropertiesSection from './default-properties/DefaultPropertiesSection'
import { isSceneLoadedState, isSceneOpenState } from '../../state/SceneState'
import { useRecoilValue } from 'recoil'

interface Props {}

const LeftSidebar = ({}: Props): JSX.Element => {
  const isSceneLoaded = useRecoilValue(isSceneLoadedState)
  const isSceneOpen = useRecoilValue(isSceneOpenState)
  return (
    <>
      <SceneSection />
      <SpritesSection />
      {isSceneOpen && isSceneLoaded && <DefaultPropertiesSection />}
      <FlexFiller />
    </>
  )
}

export default LeftSidebar
