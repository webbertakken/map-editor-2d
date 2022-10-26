import React from 'react'
import { Button } from 'dracula-ui'
import { useRecoilState, useRecoilValue } from 'recoil'
import { open } from '@tauri-apps/api/dialog'
import { useNotification } from '../../../hooks/useNotification'
import { areSpritesAssetsLoadedSelector, assetsState } from '../../../state/AssetsState'
import { AssetsLoader } from '../../../service/AssetsLoader'
import { sceneAbsolutePathSelector, sceneState } from '../../../state/SceneState'
import { AssetPath } from '../../../model/AssetPath'
import { Scene } from '../../../model/Scene'
import { Path } from '../../../model/Path'

interface Props {}

const SelectAssetsPath = ({}: Props): JSX.Element => {
  const [_1, setAssets] = useRecoilState(assetsState)
  const [_2, setScene] = useRecoilState(sceneState)
  const scenePath = useRecoilValue(sceneAbsolutePathSelector)
  const areSelected = useRecoilValue(areSpritesAssetsLoadedSelector)
  const notify = useNotification()

  const selectAssetsPath = async () => {
    try {
      let assetsAbsolutePath = await open({
        title: 'Where are you sprites located?',
        multiple: false,
        directory: true,
        recursive: true,
      })

      // Nothing selected
      if (assetsAbsolutePath === null || Array.isArray(assetsAbsolutePath)) return
      // Normalise
      assetsAbsolutePath = Path.normalise(assetsAbsolutePath)

      // Notify user while loading the files into the editor
      const assetsRelativePath = AssetPath.toRelative(scenePath, assetsAbsolutePath)
      const assets = await notify.promise(AssetsLoader.loadAssets(scenePath, assetsAbsolutePath), {
        loading: 'Loading your sprites...',
        success: 'Sprites loaded successfully',
        error: (error) => `Error while loading your sprites: ${error}`,
      })

      setAssets(assets)
      setScene((scene) => Scene.addAssetsRelativePath(scene, assetsRelativePath))
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
