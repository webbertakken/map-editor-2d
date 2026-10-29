import React, { RefObject, useEffect, useRef } from 'react'
import Konva from 'konva'
import { Transformer } from 'react-konva'

interface Props extends Konva.TransformerConfig {
  nodeRef: RefObject<Konva.Node | null>
}

export const SpriteTransformer = ({ nodeRef, children, ...rest }: Props) => {
  const transformerRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    if (!transformerRef.current || !nodeRef.current) return

    transformerRef.current.setNode(nodeRef.current)
    transformerRef.current.getLayer()!.batchDraw()
  }, [nodeRef])

  return (
    <Transformer
      ref={transformerRef}
      rotationSnaps={[0, 90, 180, -90]}
      rotationSnapTolerance={2}
      borderDash={[3, 3]}
      anchorSize={8}
      centeredScaling={true}
      shouldOverdrawWholeArea={true}
      useSingleNodeRotation={true}
      anchorCornerRadius={1}
      {...rest}
    >
      {children}
    </Transformer>
  )
}
