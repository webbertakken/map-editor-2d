import React from 'react'
import Section from '../../layout/Section'
import { useRecoilValue } from 'recoil'
import { sceneNameSelector } from '../../../state/SceneState'

interface Props {}

export const SceneSection = ({}: Props): JSX.Element => {
  const sceneName = useRecoilValue(sceneNameSelector)

  return (
    <Section title="Scene" color="pink" flexGrow={0}>
      {sceneName}
    </Section>
  )
}
