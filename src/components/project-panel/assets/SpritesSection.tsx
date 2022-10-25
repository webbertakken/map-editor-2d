import { useRecoilValue } from 'recoil'
import { areSpritesAssetsLoadedSelector, spriteAssetsSelector } from '../../../model/Assets'
import Section from '../../layout/Section'
import styles from '../Sprite.module.css'
import React from 'react'
import SpriteAsset from './SpriteAsset'

interface Props {}

export const SpritesSection = ({}: Props): JSX.Element | null => {
  const areSpritesLoaded = useRecoilValue(areSpritesAssetsLoadedSelector)
  const spriteAssets = useRecoilValue(spriteAssetsSelector)

  if (!areSpritesLoaded) return null

  return (
    <Section title="Sprites" color="green" flexGrow={20}>
      <div className={styles.spriteList}>
        {spriteAssets.map(({ name, ...spriteProps }) => (
          <SpriteAsset key={name} name={name} {...spriteProps} />
        ))}
      </div>
    </Section>
  )
}
