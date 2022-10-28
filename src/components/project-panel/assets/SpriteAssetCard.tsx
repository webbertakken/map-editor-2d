import React, { DragEventHandler, useContext } from 'react'
import styles from '../Sprite.module.css'
import { AppContext } from '../../../context/AppContext'
import { SpriteAsset } from '../../../model/SpriteAsset'

const SpriteAssetCard = (asset: SpriteAsset): JSX.Element => {
  const { dragAndDropRef } = useContext(AppContext)

  const { name, src } = asset

  const onDragStart: DragEventHandler<HTMLDivElement> = () => {
    dragAndDropRef.current = asset
  }

  return (
    <div className={styles.sprite} draggable onDragStart={onDragStart}>
      <div className={styles.image} style={{ backgroundImage: `url('${src}')` }} />
      <div className={styles.title}>{name}</div>
    </div>
  )
}

export default SpriteAssetCard
