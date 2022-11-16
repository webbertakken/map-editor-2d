import React from 'react'
import Section from '../../layout/Section'
import { Box, Checkbox, Heading } from 'dracula-ui'
import FormRow from '../../atoms/FormRow'
import { Field } from '../../atoms/Field'
import { defaultPropertiesState } from '../../../state/AssetsState'
import { useRecoilState } from 'recoil'
import { cloneDeep, set } from 'lodash'

interface Props {}

const DefaultPropertiesSection = ({}: Props): JSX.Element => {
  const [defaultProps, setDefaultProps] = useRecoilState(defaultPropertiesState)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, value, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setDefaultProps((data) => set(cloneDeep(data), id, newValue))
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

      <Box pt="sm">
        <Heading size="xs" color="yellow" as="h3">
          Editor settings
        </Heading>
      </Box>

      <FormRow>
        <Box my="xs">
          <Checkbox color="green" id="locked" checked={defaultProps.locked} onChange={onChange} />
          <label htmlFor="locked">Locked</label>
        </Box>
      </FormRow>

      <Box pt="sm">
        <Heading size="xs" color="yellow" as="h3">
          Physics
        </Heading>
      </Box>

      <Heading size="xs">Rigidbody</Heading>
      <FormRow>
        <Box my="xs">
          <Checkbox
            color="green"
            id="isStatic"
            checked={defaultProps.isStatic}
            onChange={onChange}
          />
          <label htmlFor="isStatic">Static</label>
        </Box>
      </FormRow>

      <Heading size="xs">Weight</Heading>
      <FormRow>
        <Box my="xs">
          <label htmlFor="useSizeForWeight">
            <Checkbox
              color="white"
              id="useSizeForWeight"
              checked={defaultProps.useSizeForWeight}
              onChange={onChange}
            />{' '}
            <Field
              style={{ width: '6em' }}
              disabled={!defaultProps.useSizeForWeight}
              color="green"
              type="number"
              max="10000"
              min="0"
              id="sizeToWeightMultiplier"
              value={defaultProps.sizeToWeightMultiplier}
              onChange={onChange}
            />{' '}
            kg per sqm
          </label>
        </Box>
      </FormRow>

      <FormRow>
        <Box my="xs">
          <label htmlFor="notUseSizeForWeight">
            <Checkbox
              color="white"
              id="notUseSizeForWeight"
              checked={!defaultProps.useSizeForWeight}
              onChange={(e) =>
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    id: 'useSizeForWeight',
                    type: 'checkbox',
                    checked: !e.target.checked,
                  },
                })
              }
            />{' '}
            <Field
              disabled={defaultProps.useSizeForWeight}
              style={{ width: '5em' }}
              color="green"
              type="number"
              max="10000"
              min="0"
              id="weight"
              value={defaultProps.weight}
              onChange={onChange}
            />{' '}
            kg
          </label>
        </Box>
      </FormRow>
    </Section>
  )
}

export default DefaultPropertiesSection
