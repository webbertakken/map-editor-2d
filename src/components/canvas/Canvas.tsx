import { Stage, Layer, Star, Text } from 'react-konva'
import React, { createRef, useEffect, useState } from 'react'
import Konva from 'konva'

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }))
}

const INITIAL_STATE = generateShapes()

export const Canvas = () => {
  const ref = createRef<HTMLDivElement>()
  const [width, setWidth] = useState<number>(640)
  const [height, setHeight] = useState<number>(480)
  const [stars, setStars] = React.useState(INITIAL_STATE)

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight)
      setWidth(ref.current.offsetWidth)
    }
  }, [ref])

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.id()
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        }
      }),
    )
  }
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setStars(
      stars.map((star) => {
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
          {stars.map((star) => (
            <Star
              key={star.id}
              id={star.id}
              x={star.x}
              y={star.y}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              draggable
              rotation={star.rotation}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={star.isDragging ? 10 : 5}
              shadowOffsetY={star.isDragging ? 10 : 5}
              scaleX={star.isDragging ? 1.2 : 1}
              scaleY={star.isDragging ? 1.2 : 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
