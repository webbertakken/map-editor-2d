import React, { HTMLInputTypeAttribute } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  selectedSpriteIdsState,
  spriteDatasWithId,
  spriteMetasWithId,
} from '../../../state/SpritesState'
import { Box, Checkbox, Heading } from 'dracula-ui'
import Section from '../../layout/Section'
import FormRow from '../../atoms/FormRow'
import CopyButton from '../../atoms/CopyButton'
import { cloneDeep, set } from 'lodash'
import { Field } from '../../atoms/Field'

const calculateWeight = (
  width: number,
  height: number,
  scale: Scale,
  sizeToWeightMultiplier: number | string,
) => {
  return (
    ((width * Number(scale.x) * height * Number(scale.y)) / 10_000) * Number(sizeToWeightMultiplier)
  )
}

const getDerivedValues = (
  id: string,
  value: any,
  spriteData: SpriteData,
  spriteMeta: SpriteMeta,
) => {
  console.log(id, value, spriteMeta.spriteWidth, spriteMeta.spriteHeight)
  switch (id) {
    case 'sizeToWeightMultiplier': {
      const weight = calculateWeight(
        spriteMeta.spriteWidth,
        spriteMeta.spriteHeight,
        spriteData.scale,
        value,
      )
      return { weight }
    }
    case 'useSizeForWeight': {
      if (value === false) return {}
      const weight = calculateWeight(
        spriteMeta.spriteWidth,
        spriteMeta.spriteHeight,
        spriteData.scale,
        spriteData.sizeToWeightMultiplier,
      )
      return { weight }
    }
    default:
      return {}
  }
}

export const InspectorSection = (): JSX.Element => {
  const [selectionId] = useRecoilValue(selectedSpriteIdsState)
  const [spriteData, setSpriteData] = useRecoilState(spriteDatasWithId(selectionId))
  const [spriteMeta, _] = useRecoilState(spriteMetasWithId(selectionId))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target
    let newValue = type === 'checkbox' ? checked : value

    setSpriteData((data) => {
      let newData = cloneDeep(data)
      set(newData, id, newValue)
      Object.assign(newData, getDerivedValues(id, newValue, spriteData, spriteMeta))
      return newData
    })
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

      <FormRow>
        <Box mt="xs">
          <Checkbox color="green" id="locked" checked={spriteData.locked} onChange={onChange} />
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
          <Checkbox color="green" id="isStatic" checked={spriteData.isStatic} onChange={onChange} />
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
              checked={spriteData.useSizeForWeight}
              onChange={onChange}
            />{' '}
            <Field
              style={{ width: '6em' }}
              disabled={!spriteData.useSizeForWeight}
              color="green"
              type="number"
              max="10000"
              min="0"
              id="sizeToWeightMultiplier"
              value={spriteData.sizeToWeightMultiplier}
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
              checked={!spriteData.useSizeForWeight}
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
              disabled={spriteData.useSizeForWeight}
              style={{ width: '6em' }}
              color="green"
              type="number"
              max="10000"
              min="0"
              id="weight"
              value={spriteData.weight}
              onChange={onChange}
            />{' '}
            kg
          </label>
        </Box>
      </FormRow>
    </Section>
  )
}

export default InspectorSection
