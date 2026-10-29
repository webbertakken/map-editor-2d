import { Layer, Stage } from 'react-konva'
import React, { DragEventHandler, useContext } from 'react'
import Konva from 'konva'
import { useWindowSize } from '../../hooks/useWindowSize'
import { AppContext, AppContextProps } from '../../context/AppContext'
import { SpriteMeta } from '../../model/SpriteMeta'
import { CanvasSprite } from './objects/CanvasSprite'
import { useAtomValue, useSetAtom } from 'jotai'
import { SpriteData } from '../../model/SpriteData'
import { addSpriteAction, selectedSpriteIdsState, spriteIdsState } from '../../state/SpritesState'
import CopyAndPasteListener from './listeners/CopyAndPasteListener'
import DeleteListener from './listeners/DeleteListener'
import DeselectListener from './listeners/DeselectListener'
import { useGlobalHotkeys } from '../../hooks/useGlobalHotkeys'
import { defaultPropertiesState } from '../../state/AssetsState'

export const Canvas = () => {
  const stageRef = React.useRef<Konva.Stage>(null)
  const windowSize = useWindowSize()
  const setSelectedSpriteIds = useSetAtom(selectedSpriteIdsState)
  const defaultProps = useAtomValue(defaultPropertiesState)
  const width =
    windowSize.width && windowSize.width - 500 /* both sidebars */ - 12 /* both scrollbars */
  const height = windowSize.height && windowSize.height - 42 /* menu */
  const addSprite = useSetAtom(addSpriteAction)
  const spriteIds = useAtomValue(spriteIdsState)
  const { dragAndDropRef } = useContext<AppContextProps>(AppContext)
  const [enableHotkeys, disableHotkeys] = useGlobalHotkeys()

  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault()
  }

  const onDrop: DragEventHandler = (e) => {
    e.preventDefault()
    if (!stageRef.current) return console.error('No stage ref')
    if (!dragAndDropRef.current) return console.error('No drag and drop ref')

    // Register event position
    stageRef.current.setPointersPositions(e)
    const { x, y } = stageRef.current.getPointerPosition() || { x: 0, y: 0 }

    // Add sprite to canvas at that position
    const { relativePath } = dragAndDropRef.current
    const spriteData = SpriteData.createFromDragAndDrop(x, y, relativePath, defaultProps)
    const spriteMeta = SpriteMeta.createFromSpriteAsset(spriteData.id, dragAndDropRef.current)
    addSprite(spriteData.id, spriteData, spriteMeta)

    // Don't store the last dragged image
    dragAndDropRef.current = null
  }

  const onClick = (_e: Konva.KonvaEventObject<MouseEvent>) => {
    setSelectedSpriteIds([])
  }

  return (
    <div
      style={{ flexGrow: 1 }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onMouseEnter={enableHotkeys}
      onMouseLeave={disableHotkeys}
    >
      <CopyAndPasteListener />
      <DeleteListener />
      <DeselectListener />

      <Stage width={width} height={height} ref={stageRef} onClick={onClick}>
        <Layer>
          {spriteIds.map((id) => (
            <CanvasSprite key={id} id={id} />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
