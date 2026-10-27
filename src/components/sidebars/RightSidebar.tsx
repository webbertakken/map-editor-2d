import React from 'react'
import { useAtomValue } from 'jotai'
import { selectedSpriteIdsState } from '../../state/SpritesState'
import InspectorSection from './inspector/InspectorSection'

interface Props {}

const RightSidebar = ({}: Props): React.JSX.Element => {
  const selectedSprites = useAtomValue(selectedSpriteIdsState)
  const hasSelection = selectedSprites.length > 0

  return <>{hasSelection && <InspectorSection />}</>
}

export default RightSidebar
