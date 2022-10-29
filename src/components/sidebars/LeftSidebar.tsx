import React from 'react'
import FlexFiller from '../atoms/FlexFiller'
import { SceneSection } from './scenes-section/SceneSection'
import { SpritesSection } from './assets-section/SpritesSection'

interface Props {}

const LeftSidebar = ({}: Props): JSX.Element => {
  return (
    <>
      <SceneSection />
      <SpritesSection />
      <FlexFiller />
    </>
  )
}

export default LeftSidebar
