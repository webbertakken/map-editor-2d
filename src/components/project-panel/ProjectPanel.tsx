import React from 'react'
import FlexFiller from '../atoms/FlexFiller'
import { SceneSection } from './scene/SceneSection'
import { SpritesSection } from './assets/SpritesSection'

interface Props {}

const ProjectPanel = ({}: Props): JSX.Element => {
  return (
    <>
      <SceneSection />
      <SpritesSection />
      <FlexFiller />
    </>
  )
}

export default ProjectPanel
