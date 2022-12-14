import useImage from 'use-image'
import { Image as KonvaImage, Transformer } from 'react-konva'
import React, { useEffect } from 'react'
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore'
import { ImageConfig } from 'konva/lib/shapes/Image'
import Konva from 'konva'
import { useRecoilState } from 'recoil'
import {
  selectedSpriteIdsState,
  spriteDatasWithId,
  spriteMetasWithId,
} from '../../../state/SpritesState'
import { useTransformer } from './hooks/useTransformer'
import { noop } from 'lodash'

interface Props extends KonvaNodeEvents, Partial<ImageConfig> {
  id: string
}

export const CanvasSprite = ({ id, ...props }: Props) => {
  const ref = React.createRef<Konva.Node>()
  const Transformer = useTransformer(ref)
  const [selectedIds, setSelectedIds] = useRecoilState(selectedSpriteIdsState)
  const [spriteData, setSpriteData] = useRecoilState(spriteDatasWithId(id))
  const [spriteMeta, setSpriteMeta] = useRecoilState(spriteMetasWithId(id))

  const isSelected = selectedIds.includes(id)

  const { scale, rotation, position, opacity, locked } = spriteData
  const { src, isDragging } = spriteMeta

  const [htmlImageElement] = useImage(src)
  const { width, height } = htmlImageElement || { width: 0, height: 0 }

  const scaleX = Number(scale.x)
  const scaleY = Number(scale.y)

  // When image loads, get the width and height, needed for weight calculations
  useEffect(() => {
    if (!width || !height) return
    setSpriteMeta((meta) => ({ ...meta, spriteWidth: width, spriteHeight: height }))
  }, [width, height])

  const onDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    setSpriteMeta((meta) => ({ ...meta, isDragging: true }))
  }

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setSpriteData((data) => ({
      ...data,
      position: {
        x: Number(e.target.x().toFixed(0)),
        y: Number(e.target.y().toFixed(0)),
        z: Number(Number(data.position.z).toFixed(0)),
      },
    }))
    setSpriteMeta((meta) => ({ ...meta, isDragging: false }))
  }

  const onDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    onClick(e)
  }

  const onClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // prevent deselection by clicking on the canvas
    e.cancelBubble = true

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    } else if (e.evt.shiftKey) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds([id])
    }
  }

  const onTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const node = ref.current
    if (!node) return

    const scaleX = node.scaleX().toFixed(2)
    const scaleY = node.scaleY().toFixed(2)
    const rotation = Number(node.rotation().toFixed(0)) as Rotation
    setSpriteData((data) => ({ ...data, scale: { x: scaleX, y: scaleY, z: '1.0' }, rotation }))
  }

  const draggable = !(locked && !isSelected)

  return (
    <>
      {isSelected && <Transformer />}
      <KonvaImage
        // @ts-ignore
        ref={ref}
        draggable={draggable}
        shadowOffsetX={isDragging ? 10 : 5}
        shadowOffsetY={isDragging ? 10 : 5}
        shadowColor="rgba(0, 0, 0, 0.5)"
        shadowBlur={10}
        shadowOpacity={0.6}
        {...props}
        {...spriteMeta}
        id={id}
        image={htmlImageElement}
        x={position.x}
        y={position.y}
        offsetX={width / 2}
        offsetY={height / 2}
        rotation={rotation}
        scaleX={scaleX}
        scaleY={scaleY}
        opacity={opacity}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClick={locked ? noop : onClick}
        onDblClick={onDoubleClick}
        onTap={locked ? noop : onClick}
        onDblTap={onDoubleClick}
        onTransformEnd={onTransformEnd}
      />
    </>
  )
}
