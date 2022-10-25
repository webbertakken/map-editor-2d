import React, { DragEventHandler, useContext } from 'react'
import styles from '../Sprite.module.css'
import { DragAndDropContext } from '../../../context/DragAndDropContext'

interface SpriteAsset {
  name: string
  dataUrl: string
}

const SpriteAsset = ({ name, dataUrl }: SpriteAsset): JSX.Element => {
  const { dragAndDropRef } = useContext(DragAndDropContext)

  const onDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    dragAndDropRef.current = dataUrl
  }

  return (
    <div className={styles.sprite} draggable={true} onDragStart={onDragStart}>
      <div className={styles.image} style={{ backgroundImage: `url('${dataUrl}')` }} />
      <span className={styles.title}>{name}</span>
    </div>
  )
}

export default SpriteAsset
