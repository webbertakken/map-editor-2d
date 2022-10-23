import React from 'react'
import Section from '../layout/Section'
import { useRecoilValue } from 'recoil'
import { sceneNameState } from '../../model/scene/scene'

interface Props {}

const ProjectPanel = ({}: Props): JSX.Element => {
  const sceneName = useRecoilValue(sceneNameState)

  return (
    <>
      <Section title="Scene" color="pink">
        {sceneName}
      </Section>
    </>
  )
}

export default ProjectPanel
