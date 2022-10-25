import useImage from 'use-image'
import { Image as KonvaImage } from 'react-konva'
import React from 'react'
import { CanvasSpriteData } from '../../model/CanvasItem'
import { CANVAS_LIFT_UP_SCALING_FACTOR } from '../../constants'
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore'
import { ImageConfig } from 'konva/lib/shapes/Image'

interface Props extends KonvaNodeEvents, Partial<ImageConfig> {
  data: CanvasSpriteData
}

export const CanvasSprite = ({ data, ...props }: Props) => {
  const { id, src, scale, rotation, position, isDragging, opacity } = data

  const [htmlImageElement] = useImage(src)
  const { width, height } = htmlImageElement || { width: 0, height: 0 }

  const x = position.x - width / 2
  const y = position.y - height / 2

  const scaleX = isDragging ? scale.x * CANVAS_LIFT_UP_SCALING_FACTOR : scale.x
  const scaleY = isDragging ? scale.y * CANVAS_LIFT_UP_SCALING_FACTOR : scale.y

  return (
    <KonvaImage
      draggable={true}
      id={id}
      image={htmlImageElement}
      x={x}
      y={y}
      offsetX={0}
      offsetY={0}
      rotation={rotation}
      scaleX={scaleX}
      scaleY={scaleY}
      opacity={opacity}
      shadowOffsetX={isDragging ? 10 : 5}
      shadowOffsetY={isDragging ? 10 : 5}
      shadowColor="rgba(0, 0, 0, 0.5)"
      shadowBlur={10}
      shadowOpacity={0.6}
      {...props}
    />
  )
}
