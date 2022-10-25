import React from 'react'
import { Button } from 'dracula-ui'
import { useRecoilState, useRecoilValue } from 'recoil'
import { open } from '@tauri-apps/api/dialog'
import { useNotification } from '../../../hooks/useNotification'
import { scenePathSelector } from '../../../model/SceneMeta'
import { areSpritesAssetsLoadedSelector, assetsState } from '../../../state/AssetsState'
import { AssetsLoader } from '../../../service/AssetsLoader'

interface Props {}

const SelectAssetsPath = ({}: Props): JSX.Element => {
  const [_1, setAssets] = useRecoilState(assetsState)
  const scenePath = useRecoilValue(scenePathSelector)
  const areSelected = useRecoilValue(areSpritesAssetsLoadedSelector)
  const notify = useNotification()

  const selectAssetsPath = async () => {
    try {
      const assetsAbsolutePath = await open({
        title: 'Where are you sprites located?',
        multiple: false,
        directory: true,
        recursive: true,
      })

      // Nothing selected
      if (assetsAbsolutePath === null || Array.isArray(assetsAbsolutePath)) return

      // Notify user while loading the files into the editor
      const assets = await notify.promise(AssetsLoader.loadAssets(scenePath, assetsAbsolutePath), {
        loading: 'Loading your sprites...',
        success: 'Sprites loaded successfully',
        error: 'Error while loading your sprites',
      })

      setAssets(assets)
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
