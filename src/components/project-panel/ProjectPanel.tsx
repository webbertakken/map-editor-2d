import React from 'react'
import Section from '../layout/Section'
import { useRecoilValue } from 'recoil'
import { sceneNameSelector } from '../../model/SceneFile'
import { areSpritesLoadedSelector, spritesSelector } from '../../model/Assets'
import styles from './Sprite.module.css'

interface Props {}

const ProjectPanel = ({}: Props): JSX.Element => {
  const sceneName = useRecoilValue(sceneNameSelector)
  const areSpritesLoaded = useRecoilValue(areSpritesLoadedSelector)
  const sprites = useRecoilValue(spritesSelector)

  return (
    <>
      <Section title="Scene" color="pink">
        {sceneName}
      </Section>
      {areSpritesLoaded && (
        <Section title="Sprites" color="green">
          <div className={styles.spriteList}>
            {sprites.map((sprite) => (
              <div key={sprite.name} className={styles.sprite}>
                <img src={sprite.dataUrl} alt={sprite.name} width={50} height={50} />
                <span>{sprite.name}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}

export default ProjectPanel
