import React from 'react'
import { Box, Heading } from 'dracula-ui'
import Section from '../layout/Section'

interface Props {}

const ProjectPanel = ({}: Props): JSX.Element => {
  return (
    <>
      <Section title="Scene" color="pink">
        No scene selected
      </Section>
    </>
  )
}

export default ProjectPanel
