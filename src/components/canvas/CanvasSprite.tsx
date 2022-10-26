import useImage from 'use-image'
import { Image as KonvaImage } from 'react-konva'
import React from 'react'
import { CANVAS_LIFT_UP_SCALING_FACTOR } from '../../constants'
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore'
import { ImageConfig } from 'konva/lib/shapes/Image'
import Konva from 'konva'
import { useRecoilState } from 'recoil'
import { spriteDatasWithId, spriteMetasWithId } from '../../state/SpritesState'

interface Props extends KonvaNodeEvents, Partial<ImageConfig> {
  id: string
}

export const CanvasSprite = ({ id, ...props }: Props) => {
  const [spriteData, setSpriteData] = useRecoilState(spriteDatasWithId(id))
  const [spriteMeta, setSpriteMeta] = useRecoilState(spriteMetasWithId(id))

  const { scale, rotation, position, opacity } = spriteData
  const { src, isDragging } = spriteMeta

  const [htmlImageElement] = useImage(src)
  const { width, height } = htmlImageElement || { width: 0, height: 0 }

  const x = position.x - width / 2
  const y = position.y - height / 2

  const scaleX = isDragging ? scale.x * CANVAS_LIFT_UP_SCALING_FACTOR : scale.x
  const scaleY = isDragging ? scale.y * CANVAS_LIFT_UP_SCALING_FACTOR : scale.y

  const onDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    setSpriteMeta((meta) => ({ ...meta, isDragging: true }))
  }

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setSpriteMeta((meta) => ({ ...meta, isDragging: false }))
  }

  return (
    <KonvaImage
      draggable={true}
      shadowOffsetX={isDragging ? 10 : 5}
      shadowOffsetY={isDragging ? 10 : 5}
      shadowColor="rgba(0, 0, 0, 0.5)"
      shadowBlur={10}
      shadowOpacity={0.6}
      {...props}
      {...spriteMeta}
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
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  )
}
