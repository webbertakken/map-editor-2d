import { Layer, Stage, Text } from 'react-konva'
import React, { createRef, useContext, useEffect, useState } from 'react'
import Konva from 'konva'
import { useWindowSize } from '../../hooks/useWindowSize'
import { DragAndDropContext } from '../../context/DragAndDropContext'
import { CanvasSpriteData } from '../../model/CanvasItem'
import { CanvasSprite } from './CanvasSprite'

export const Canvas = () => {
  const ref = createRef<HTMLDivElement>()
  const stageRef = React.useRef()
  const windowSize = useWindowSize()
  const [width, setWidth] = useState<number | undefined>(windowSize.width)
  const [height, setHeight] = useState<number | undefined>(windowSize.height)
  const [sprites, setSprites] = React.useState<CanvasSpriteData[]>([])
  const { dragAndDropRef } = useContext(DragAndDropContext)

  useEffect(() => {
    if (ref.current) {
      setWidth(window.innerWidth - 500 /* both sidebars */ - 12 /* both scrollbars */)
      setHeight(window.innerHeight - 42 /* menu */)
    }
  }, [ref, windowSize])

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.id()
    setSprites(
      sprites.map((sprite) => {
        return {
          ...sprite,
          isDragging: sprite.id === id,
        }
      }),
    )
  }

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setSprites(
      sprites.map((star) => {
        return {
          ...star,
          isDragging: false,
        }
      }),
    )
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (e) => {
    e.preventDefault()

    // Register event position
    stageRef.current.setPointersPositions(e)
    const { x, y } = stageRef.current.getPointerPosition()

    // Add sprite to canvas state
    const sprite = CanvasSpriteData.fromDragAndDrop(dragAndDropRef.current, x, y)
    setSprites((sprites) => [...sprites, sprite])

    // Don't store the last dragged image
    dragAndDropRef.current = undefined
  }

  return (
    <div ref={ref} style={{ flexGrow: 1 }} onDragOver={onDragOver} onDrop={onDrop}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          <Text text="Try to drag a star" />
          {sprites.map((data) => {
            return (
              <CanvasSprite
                key={data.id}
                data={data}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            )
          })}
        </Layer>
      </Stage>
    </div>
  )
}
