import { Layer, Stage } from 'react-konva'
import React, { createRef, DragEventHandler, useContext, useEffect, useState } from 'react'
import Konva from 'konva'
import { useWindowSize } from '../../hooks/useWindowSize'
import { DragAndDropContext, DragAndDropContextProps } from '../../context/DragAndDropContext'
import { SpriteMeta } from '../../model/SpriteMeta'
import { CanvasSprite } from './CanvasSprite'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { SpriteData } from '../../model/SpriteData'
import { addSpriteCallback, spriteIdsState } from '../../state/SpritesState'

export const Canvas = () => {
  const ref = createRef<HTMLDivElement>()
  const stageRef = React.useRef<Konva.Stage>(null)
  const windowSize = useWindowSize()
  const [width, setWidth] = useState<number | undefined>(windowSize.width)
  const [height, setHeight] = useState<number | undefined>(windowSize.height)
  const addSprite = useRecoilCallback(addSpriteCallback, [])
  const spriteIds = useRecoilValue(spriteIdsState)
  const { dragAndDropRef } = useContext<DragAndDropContextProps>(DragAndDropContext)

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
    if (!stageRef.current) return console.warn('No stage ref')
    if (!dragAndDropRef.current) return console.warn('No drag and drop ref')

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

  return (
    <div ref={ref} style={{ flexGrow: 1 }} onDragOver={onDragOver} onDrop={onDrop}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          {spriteIds.map((id) => (
            <CanvasSprite key={id} id={id} />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
