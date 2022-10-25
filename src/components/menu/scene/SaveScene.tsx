import React, { useEffect } from 'react'
import { sceneAbsoluteFilePath, sceneFileDataSelector } from '../../../state/SceneState'
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
  const notify = useNotification()

  const save = async () => {
    try {
      const fileContents = Scene.toFile(sceneFileData)
      await writeTextFile(sceneFilePath, fileContents)
      console.log('saved')
    } catch (e) {
      notify.error(`Failed to save scene ${e}`)
    }
  }

  useEffect(() => {
    if (isAutoSaveEnabled) {
      save()
    }
  }, [sceneFileData, isAutoSaveEnabled])

  const onAutoSaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, autoSave: e.target.checked }))
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
        <Button size="xs" color={'green'} onClick={save}>
          Save
        </Button>
      )}
      {autoSaveCheckBox}
    </>
  )
}

export default SaveScene
