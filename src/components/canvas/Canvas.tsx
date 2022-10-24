import { Layer, Sprite as KonvaSprite, Stage, Text } from 'react-konva'
import React, { createRef, useEffect, useState } from 'react'
import Konva from 'konva'
import { useWindowSize } from '../../hooks/useWindowSize'
import { SpriteInstance } from '../../model/SpriteInstance'

interface CanvasItem<T> {
  data: T
  id: string
  isDragging: boolean
}

export const Canvas = () => {
  const ref = createRef<HTMLDivElement>()
  const windowSize = useWindowSize()
  const [width, setWidth] = useState<number | undefined>(windowSize.width)
  const [height, setHeight] = useState<number | undefined>(windowSize.height)
  const [sprites, setSprites] = React.useState<CanvasItem<SpriteInstance>[]>([])

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

  return (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <Stage width={width} height={height}>
        <Layer>
          <Text text="Try to drag a star" />
          {sprites.map((spriteInstance) => (
            <KonvaSprite
              key={spriteInstance.id}
              id={spriteInstance.id}
              draggable
              x={spriteInstance.data.position.x}
              y={spriteInstance.data.position.y}
              rotation={spriteInstance.data.rotation}
              scaleX={
                spriteInstance.isDragging
                  ? spriteInstance.data.scale.x * 1.2
                  : spriteInstance.data.scale.x
              }
              scaleY={
                spriteInstance.isDragging
                  ? spriteInstance.data.scale.y * 1.2
                  : spriteInstance.data.scale.y
              }
              opacity={0.8}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={spriteInstance.isDragging ? 10 : 5}
              shadowOffsetY={spriteInstance.isDragging ? 10 : 5}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              animations={null}
              animation="none"
              image={new HTMLImageElement()}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
