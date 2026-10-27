import React from 'react'
import FlexFiller from '../atoms/FlexFiller'
import { SceneSection } from './scenes/SceneSection'
import { SpritesSection } from './assets/SpritesSection'
import DefaultPropertiesSection from './default-properties/DefaultPropertiesSection'
import { isSceneLoadedState, isSceneOpenState } from '../../state/SceneState'
import { useAtomValue } from 'jotai'

interface Props {}

const LeftSidebar = ({}: Props): React.JSX.Element => {
  const isSceneLoaded = useAtomValue(isSceneLoadedState)
  const isSceneOpen = useAtomValue(isSceneOpenState)
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
