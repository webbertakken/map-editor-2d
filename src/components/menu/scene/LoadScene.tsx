import React from 'react'
import { Button, Paragraph } from 'dracula-ui'
import Modal from '../../modal/Modal'
import ExternalLink from '../../atoms/ExternalLink'
import { open } from '@tauri-apps/api/dialog'
import { SCENE_FILE_TYPE_EXTENSION, SCENE_FILE_TYPE_NAME } from '../../../constants'
import { readTextFile } from '@tauri-apps/api/fs'
import { Scene } from '../../../model/Scene'
import { useRecoilState } from 'recoil'
import { useNotification } from '../../../hooks/useNotification'
import { SceneMeta } from '../../../model/SceneMeta'
import { sceneMetaState, sceneState } from '../../../state/SceneState'
import { AssetsLoader } from '../../../service/AssetsLoader'
import { assetsState } from '../../../state/AssetsState'
import { AssetPath } from '../../../model/AssetPath'
import { Path } from '../../../model/Path'
import { Assets } from '../../../model/Assets'
import { canvasSpritesState } from '../../../state/CanvasState'

class Props {}

const NewScene = ({}: Props): JSX.Element => {
  const [_1, setScene] = useRecoilState(sceneState)
  const [_2, setSceneMeta] = useRecoilState(sceneMetaState)
  const [_3, setAssets] = useRecoilState(assetsState)
  const [_4, setSprites] = useRecoilState(canvasSpritesState)
  const notify = useNotification()
  const [isOpen, setIsOpen] = React.useState(false)

  const title = 'Load'
  const color = 'orange'

  const openLoadFileDialog = async () => {
    try {
      // Open a selection dialog for image files
      let rawFilePath = await open({
        title: 'Create a new scene',
        multiple: false,
        directory: false,
        filters: [
          {
            name: SCENE_FILE_TYPE_NAME,
            extensions: [SCENE_FILE_TYPE_EXTENSION],
          },
        ],
      })

      // No file chosen
      if (rawFilePath === null || Array.isArray(rawFilePath)) return

      // Normalise path
      const filePath = Path.normalise(rawFilePath)

      // Load scene and its assets while informing the user
      await notify.promise(
        (async () => {
          // Reset previous scene
          setScene(Scene.default())
          setAssets(Assets.default())
          setSprites([])

          // Load file
          const fileContents = await readTextFile(filePath)

          // Parse file
          const scene = await Scene.fromFile(fileContents)

          // Load scene
          const sceneMeta = SceneMeta.create(filePath)
          setScene(scene)
          setSceneMeta(sceneMeta)

          // Load assets
          if (scene.assetsRelativePath !== null) {
            console.log('Scene has assets path, loading assets...')
            const absPath = AssetPath.toAbsolute(sceneMeta.absolutePath, scene.assetsRelativePath)
            const assets = await AssetsLoader.loadAssets(sceneMeta.absolutePath, absPath)
            setAssets(assets)
          } else {
            console.log('Scene has no assets path, skipping...')
          }

          // Close modal
          setIsOpen(false)
        })(),
        {
          loading: 'Loading your scene...',
          success: 'Scene loaded successfully',
          error: 'Error while loading your scene',
        },
      )
    } catch (error: any) {
      notify.error(error.message)
    }
  }

  return (
    <Modal
      title={title}
      button={(props) => (
        <Button color={color} size="xs" {...props}>
          {title}
        </Button>
      )}
      color={color}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Paragraph>Load a scene file.</Paragraph>
      <Paragraph>All changes are saved automatically.</Paragraph>
      <Paragraph>
        please{' '}
        <ExternalLink
          title="use version control"
          href="https://en.wikipedia.org/wiki/Version_control"
        />{' '}
        or make backups.
      </Paragraph>

      <Button color={color} onClick={openLoadFileDialog}>
        Load Scene File
      </Button>
    </Modal>
  )
}

export default NewScene
