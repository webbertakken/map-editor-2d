import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedSpriteIdsState } from '../../state/SpritesState'
import InspectorSection from './inspector/InspectorSection'

interface Props {}

const RightSidebar = ({}: Props): JSX.Element => {
  const selectedSprites = useRecoilValue(selectedSpriteIdsState)
  const hasSelection = selectedSprites.length > 0

  return <>{hasSelection && <InspectorSection />}</>
}

export default RightSidebar
