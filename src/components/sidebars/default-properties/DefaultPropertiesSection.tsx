import React from 'react'
import Section from '../../layout/Section'
import { Box, Heading } from 'dracula-ui'
import FormRow from '../../atoms/FormRow'
import { Field } from '../../atoms/Field'
import { defaultPropertiesState } from '../../../state/AssetsState'
import { useRecoilState } from 'recoil'
import { cloneDeep, set } from 'lodash'

interface Props {}

const DefaultPropertiesSection = ({}: Props): JSX.Element => {
  const [defaultProps, setDefaultProps] = useRecoilState(defaultPropertiesState)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    console.log(id, value)
    setDefaultProps((data) => set(cloneDeep(data), id, value))
  }

  return (
    <Section title="Default properties" color="yellow">
      <Heading size="xs">Layer</Heading>
      <FormRow>
        <label htmlFor="position.z">Z</label>
        <Field
          style={{ width: '6em' }}
          color="green"
          type="number"
          step="1"
          min="-1"
          max="1000"
          id="position.z"
          value={defaultProps.position.z}
          onChange={onChange}
        />
      </FormRow>

      <Heading size="xs">Scale</Heading>
      <FormRow>
        <label htmlFor="scale.x">X</label>
        <Field
          color="green"
          type="number"
          step="0.1"
          max="100"
          id="scale.x"
          value={defaultProps.scale.x}
          onChange={onChange}
        />
        <label htmlFor="scale.y">Y</label>
        <Field
          color="green"
          type="number"
          step="0.1"
          max="100"
          id="scale.y"
          value={defaultProps.scale.y}
          onChange={onChange}
        />
      </FormRow>

      <Box pt="sm">
        <Heading size="xs" color="yellow" as="h3">
          Other settings
        </Heading>
      </Box>

      <Heading size="xs">Rotation</Heading>
      <FormRow>
        <Field
          style={{ width: '6em' }}
          color="green"
          type="number"
          step="1"
          min="-179"
          max="180"
          id="rotation"
          value={defaultProps.rotation}
          onChange={onChange}
        />
        <label htmlFor="rotation">Angle</label>
      </FormRow>

      <Heading size="xs">Opacity</Heading>
      <FormRow>
        <Field
          style={{ width: '6em' }}
          color="green"
          type="number"
          step="0.1"
          max="1"
          min="0"
          id="opacity"
          value={defaultProps.opacity}
          onChange={onChange}
        />
        <label htmlFor="opacity">Opacity</label>
      </FormRow>
    </Section>
  )
}

export default DefaultPropertiesSection
