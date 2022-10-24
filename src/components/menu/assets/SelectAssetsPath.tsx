import React from 'react'
import { Button } from 'dracula-ui'
import { useRecoilState, useRecoilValue } from 'recoil'
import { areSpritesAssetsLoadedSelector, Assets, assetsState } from '../../../model/Assets'
import { open } from '@tauri-apps/api/dialog'
import { useNotification } from '../../../hooks/useNotification'
import { AssetsPath } from '../../../model/AssetsPath'
import { scenePathSelector } from '../../../model/SceneMeta'

interface Props {}

const SelectAssetsPath = ({}: Props): JSX.Element => {
  const [_1, setAssets] = useRecoilState(assetsState)
  const scenePath = useRecoilValue(scenePathSelector)
  const areSelected = useRecoilValue(areSpritesAssetsLoadedSelector)
  const notify = useNotification()

  const selectAssetsPath = async () => {
    try {
      const spritesAbsolutePath = await open({
        title: 'Where are you sprites located?',
        multiple: false,
        directory: true,
        recursive: true,
      })

      // Nothing selected
      if (spritesAbsolutePath === null || Array.isArray(spritesAbsolutePath)) return

      // Make sure it's a subdirectory of the scene
      console.log(scenePath, spritesAbsolutePath)
      if (!AssetsPath.isInsideScenePath(scenePath, spritesAbsolutePath)) {
        throw new Error('The selected directory is not inside the scene directory')
      }

      // Notify user while loading the files into the editor
      await notify.promise(
        (async () => {
          // Load the actual files
          const sprites = await Assets.loadSprites(spritesAbsolutePath)
          console.log(sprites)

          // Load in editor
          const spritesPath = AssetsPath.toRelative(scenePath, spritesAbsolutePath)
          setAssets(Assets.create(spritesPath, sprites))
        })(),
        {
          loading: 'Loading your sprites...',
          success: 'Sprites loaded successfully',
          error: 'Error while loading your sprites',
        },
      )
    } catch (error: any) {
      notify.error(error.message)
    }
  }

  return (
    <div>
      <Button size="xs" color={areSelected ? 'grey' : 'animated'} onClick={selectAssetsPath}>
        Select assets path
      </Button>
    </div>
  )
}

export default SelectAssetsPath
