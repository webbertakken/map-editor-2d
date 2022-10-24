import React from 'react'
import Section from '../layout/Section'
import { useRecoilValue } from 'recoil'
import { sceneNameSelector } from '../../model/SceneFile'
import { areSpritesLoadedSelector, spritesSelector } from '../../model/Assets'
import styles from './Sprite.module.css'
import FlexFiller from '../atoms/FlexFiller'

interface Props {}

const ProjectPanel = ({}: Props): JSX.Element => {
  const sceneName = useRecoilValue(sceneNameSelector)
  const areSpritesLoaded = useRecoilValue(areSpritesLoadedSelector)
  const sprites = useRecoilValue(spritesSelector)

  return (
    <>
      <Section title="Scene" color="pink" flexGrow={0}>
        {sceneName}
      </Section>

      {areSpritesLoaded && (
        <Section title="Sprites" color="green" flexGrow={20}>
          <div className={styles.spriteList}>
            {sprites.map((sprite) => (
              <div key={sprite.name} className={styles.sprite}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url('${sprite.dataUrl}')` }}
                />
                <span className={styles.title}>{sprite.name}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      <FlexFiller />
    </>
  )
}

export default ProjectPanel
