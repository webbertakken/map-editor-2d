import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedSpriteIdsState, spriteDatasWithId } from '../../state/SpritesState'
import { Box, Heading, Input } from 'dracula-ui'
import Section from '../layout/Section'
import { cloneDeep, set } from 'lodash'
import FormRow from '../atoms/FormRow'
import CopyButton from '../atoms/CopyButton'

interface Props {}

export const InspectorSection = ({}: Props): JSX.Element => {
  const [selectionId] = useRecoilValue(selectedSpriteIdsState)
  const [spriteData, setSpriteData] = useRecoilState(spriteDatasWithId(selectionId))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setSpriteData((data) => set(cloneDeep(data), id, value))
  }

  return (
    <Section title="Sprite" color="pink" flexGrow={0}>
      <Heading size="md" color="yellow" as="h3">
        Identifier
      </Heading>

      <label htmlFor="id">Unique ID</label>
      <FormRow>
        <Input size="sm" color="purple" disabled id="id" value={spriteData.id} />
        <CopyButton name="id" copyText={spriteData.id} />
      </FormRow>

      <label htmlFor="relativePath">Relative Path (from scene file)</label>
      <FormRow>
        <Input
          size="sm"
          color="purple"
          disabled
          id="relativePath"
          value={spriteData.relativePath}
          onChange={onChange}
        />
        <CopyButton name="relative path" copyText={spriteData.relativePath} />
      </FormRow>

      <Box pt="sm">
        <Heading size="md" color="yellow" as="h3">
          Transform
        </Heading>
      </Box>

      <Heading size="xs">Layer</Heading>
      <FormRow>
        <label htmlFor="position.z">Z</label>
        <Input
          style={{ width: '6em' }}
          size="sm"
          color="green"
          type="number"
          borderSize="sm"
          id="position.z"
          value={spriteData.position.z}
          onChange={onChange}
        />
      </FormRow>

      <Heading size="xs">Position</Heading>
      <FormRow>
        <label htmlFor="position.x">X</label>
        <Input
          size="sm"
          color="green"
          type="number"
          borderSize="sm"
          id="position.x"
          value={spriteData.position.x}
          onChange={onChange}
        />
        <label htmlFor="position.y">Y</label>
        <Input
          size="sm"
          color="green"
          type="number"
          borderSize="sm"
          id="position.y"
          value={spriteData.position.y}
          onChange={onChange}
        />
      </FormRow>

      <Heading size="xs">Scale</Heading>
      <FormRow>
        <label htmlFor="scale.x">X</label>
        <Input
          size="sm"
          color="green"
          type="number"
          step="0.1"
          borderSize="sm"
          id="scale.x"
          value={spriteData.scale.x || 1}
          onChange={onChange}
        />
        <label htmlFor="scale.y">Y</label>
        <Input
          size="sm"
          color="green"
          type="number"
          step="0.1"
          borderSize="sm"
          id="scale.y"
          value={spriteData.scale.y}
          onChange={onChange}
        />
      </FormRow>

      <Box pt="sm">
        <Heading size="md" color="yellow" as="h3">
          Other settings
        </Heading>
      </Box>

      <Heading size="xs">Rotation</Heading>
      <FormRow>
        <Input
          style={{ width: '6em' }}
          size="sm"
          color="green"
          type="number"
          borderSize="sm"
          id="rotation"
          value={spriteData.rotation}
          onChange={onChange}
        />
        <label htmlFor="rotation">Angle</label>
      </FormRow>

      <Heading size="xs">Opacity</Heading>
      <FormRow>
        <Input
          style={{ width: '6em' }}
          size="sm"
          color="green"
          type="number"
          step="0.1"
          borderSize="sm"
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
