import { Layer, Stage } from 'react-konva'
import React, { createRef, DragEventHandler, useContext, useEffect, useState } from 'react'
import Konva from 'konva'
import { useWindowSize } from '../../hooks/useWindowSize'
import { AppContext, AppContextProps } from '../../context/AppContext'
import { SpriteMeta } from '../../model/SpriteMeta'
import { CanvasSprite } from './objects/CanvasSprite'
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil'
import { SpriteData } from '../../model/SpriteData'
import { addSpriteCallback, selectedSpriteIdsState, spriteIdsState } from '../../state/SpritesState'
import CopyAndPasteListener from './listeners/CopyAndPasteListener'
import DeleteListener from './listeners/DeleteListener'
import DeselectListener from './listeners/DeselectListener'

export const Canvas = () => {
  const ref = createRef<HTMLDivElement>()
  const stageRef = React.useRef<Konva.Stage>(null)
  const windowSize = useWindowSize()
  const [_1, setSelectedSpriteIds] = useRecoilState(selectedSpriteIdsState)
  const [width, setWidth] = useState<number | undefined>(windowSize.width)
  const [height, setHeight] = useState<number | undefined>(windowSize.height)
  const addSprite = useRecoilCallback(addSpriteCallback, [])
  const spriteIds = useRecoilValue(spriteIdsState)
  const { dragAndDropRef } = useContext<AppContextProps>(AppContext)

  useEffect(() => {
    if (ref.current) {
      setWidth(window.innerWidth - 500 /* both sidebars */ - 12 /* both scrollbars */)
      setHeight(window.innerHeight - 42 /* menu */)
    }
  }, [ref, windowSize])

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
    const spriteData = SpriteData.createFromDragAndDrop(x, y, dragAndDropRef.current.relativePath)
    const spriteMeta = SpriteMeta.createFromSpriteAsset(spriteData.id, dragAndDropRef.current)
    addSprite(spriteData.id, spriteData, spriteMeta)

    // Don't store the last dragged image
    dragAndDropRef.current = null
  }

  const onClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setSelectedSpriteIds([])
  }

  return (
    <div ref={ref} style={{ flexGrow: 1 }} onDragOver={onDragOver} onDrop={onDrop}>
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
