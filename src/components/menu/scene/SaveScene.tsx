import React, { useEffect } from 'react'
import {
  isSceneLoadedState,
  isSceneOpenState,
  sceneAbsoluteFilePath,
  sceneFileDataSelector,
} from '../../../state/SceneState'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box, Button, Checkbox } from 'dracula-ui'
import { appState, isAutoSaveEnabledSelector } from '../../../state/AppState'
import { Scene } from '../../../model/Scene'
import { writeTextFile } from '@tauri-apps/api/fs'
import { useNotification } from '../../../hooks/useNotification'

interface Props {}

const SaveScene = ({}: Props): JSX.Element => {
  const [_1, setState] = useRecoilState(appState)
  const sceneFilePath = useRecoilValue(sceneAbsoluteFilePath)
  const sceneFileData = useRecoilValue(sceneFileDataSelector)
  const isAutoSaveEnabled = useRecoilValue(isAutoSaveEnabledSelector)
  const isSceneLoaded = useRecoilValue(isSceneLoadedState)
  const notify = useNotification()

  const save = async () => {
    try {
      const fileContents = Scene.toFile(sceneFileData)
      await writeTextFile(sceneFilePath, fileContents)
      console.log('Saved')
    } catch (e) {
      notify.error(`Failed to save scene ${e}`)
    }
  }

  useEffect(() => {
    if (isSceneLoaded && isAutoSaveEnabled) save()
  }, [isSceneLoaded, sceneFileData, isAutoSaveEnabled])

  const onAutoSaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, autoSave: e.target.checked }))
  }

  const onSaveButtonClick = async () => {
    await notify.promise(save(), {
      loading: 'Saving...',
      success: 'Saved 💾',
      error: (error) => `Failed to save. ${error}`,
    })
  }

  const autoSaveCheckBox = (
    <Box style={{ marginTop: 2.5 }}>
      <Checkbox
        name="autoSave"
        color="green"
        checked={isAutoSaveEnabled}
        onChange={onAutoSaveChange}
      />
      {isAutoSaveEnabled || (
        <label htmlFor="autoSave" style={{ fontSize: '75%' }} className="drac-text drac-text-white">
          Autosave
        </label>
      )}
    </Box>
  )

  return (
    <>
      {isAutoSaveEnabled || (
        <Button size="xs" color={'green'} onClick={onSaveButtonClick}>
          Save
        </Button>
      )}
      {autoSaveCheckBox}
    </>
  )
}

export default SaveScene
