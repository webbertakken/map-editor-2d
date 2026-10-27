import React from 'react'
import Section from '../../layout/Section'
import { useAtomValue } from 'jotai'
import { sceneNameSelector } from '../../../state/SceneState'

interface Props {}

export const SceneSection = ({}: Props): React.JSX.Element => {
  const sceneName = useAtomValue(sceneNameSelector)

  return (
    <Section title="Scene" color="pink" flexGrow={0}>
      {sceneName}
    </Section>
  )
}
