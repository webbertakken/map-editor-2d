import { useAtomValue } from 'jotai'
import Section from '../../layout/Section'
import styles from './Sprite.module.css'
import React from 'react'
import SpriteAssetCard from './SpriteAssetCard'
import { areSpritesAssetsLoadedSelector, spriteAssetsSelector } from '../../../state/AssetsState'

interface Props {}

export const SpritesSection = ({}: Props): React.JSX.Element | null => {
  const areSpritesLoaded = useAtomValue(areSpritesAssetsLoadedSelector)
  const spriteAssets = useAtomValue(spriteAssetsSelector)

  if (!areSpritesLoaded) return null

  return (
    <Section title="Sprites" color="green" flexGrow={20}>
      <div className={styles.spriteList}>
        {spriteAssets.map(({ id, ...spriteProps }) => (
          <SpriteAssetCard key={id} id={id} {...spriteProps} />
        ))}
      </div>
    </Section>
  )
}
