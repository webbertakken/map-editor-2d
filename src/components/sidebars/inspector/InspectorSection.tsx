import React, { HTMLInputTypeAttribute } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedSpriteIdsState, spriteDatasWithId } from '../../../state/SpritesState'
import { Box, Heading } from 'dracula-ui'
import Section from '../../layout/Section'
import FormRow from '../../atoms/FormRow'
import CopyButton from '../../atoms/CopyButton'
import { cloneDeep, set } from 'lodash'
import { Field } from '../../atoms/Field'

export const InspectorSection = (): JSX.Element => {
  const [selectionId] = useRecoilValue(selectedSpriteIdsState)
  const [spriteData, setSpriteData] = useRecoilState(spriteDatasWithId(selectionId))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setSpriteData((data) => set(cloneDeep(data), id, value))
  }

  return (
    <Section title="Inspector" color="pink" flexGrow={1} style={{ maxHeight: 'inherit' }}>
      <Heading size="xs" color="yellow" as="h3">
        Identifier
      </Heading>

      <label htmlFor="id">Unique ID</label>
      <FormRow>
        <Field color="purple" disabled id="id" value={spriteData.id} onChange={onChange} />
        <CopyButton name="id" copyText={spriteData.id} />
      </FormRow>

      <label htmlFor="relativePath">Relative Path (from scene file)</label>
      <FormRow>
        <Field
          color="purple"
          disabled
          id="relativePath"
          value={spriteData.relativePath}
          onChange={onChange}
        />
        <CopyButton name="relative path" copyText={spriteData.relativePath} />
      </FormRow>

      <Box pt="sm">
        <Heading size="xs" color="yellow" as="h3">
          Transform
        </Heading>
      </Box>

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
          value={spriteData.position.z}
          onChange={onChange}
        />
      </FormRow>

      <Heading size="xs">Position</Heading>
      <FormRow>
        <label htmlFor="position.x">X</label>
        <Field
          color="green"
          type="number"
          step="1"
          enforceStep
          id="position.x"
          value={spriteData.position.x}
          onChange={onChange}
        />
        <label htmlFor="position.y">Y</label>
        <Field
          color="green"
          type="number"
          step="1"
          enforceStep
          id="position.y"
          value={spriteData.position.y}
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
          value={spriteData.scale.x}
          onChange={onChange}
        />
        <label htmlFor="scale.y">Y</label>
        <Field
          color="green"
          type="number"
          step="0.1"
          max="100"
          id="scale.y"
          value={spriteData.scale.y}
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
          value={spriteData.rotation}
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
          value={spriteData.opacity}
          onChange={onChange}
        />
        <label htmlFor="opacity">Opacity</label>
      </FormRow>
    </Section>
  )
}

export default InspectorSection
