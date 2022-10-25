import { SCENE_FILE_CURRENT_VERSION } from '../constants'
import { gt as semverGt, lt as semverLt, valid as semverValid } from 'semver'
import { SpriteInstance } from './SpriteInstance'

interface CanvasInstance {
  sprites: SpriteInstance[]
}

/**
 * Scene data that is part of the scene file.
 */
export class Scene {
  public name: string = ''
  public version: string = ''
  public description: string = ''
  public assetsRelativePath: string | null = null
  public canvas: CanvasInstance = {} as CanvasInstance

  public static default() {
    return {
      name: 'No scene selected.',
      version: SCENE_FILE_CURRENT_VERSION,
      description: 'Please select a scene file to edit',
      assetsRelativePath: null,
      canvas: {
        sprites: [],
      },
    }
  }

  static new() {
    return {
      ...Scene.default(),
      name: 'Untitled',
      description:
        "Generated using Webber's Map Editor 2D. See https://github.com/webbertakken/map-editor-2d for more details.",
    }
  }

  static toFile(scene: Scene): string {
    return JSON.stringify(scene, null, 2)
  }

  static fromFile(sceneFileContents: string) {
    return Scene.fromJson(JSON.parse(sceneFileContents))
  }

  public static async fromJson(json: any): Promise<Scene> {
    if (!json.version) {
      throw new Error('Scene has no version.')
    }

    if (!semverValid(json.version)) {
      throw new Error(`Scene version is not valid: ${json.version}`)
    }

    let version = json.version
    let allowUnknownFields: boolean = false

    // Newer scene file
    if (semverGt(json.version, SCENE_FILE_CURRENT_VERSION)) {
      throw new Error('Scene file is too new.\nPlease upgrade this app to open it.')
    }

    // Old scene file
    if (semverLt(json.version, SCENE_FILE_CURRENT_VERSION)) {
      allowUnknownFields = true
      version = SCENE_FILE_CURRENT_VERSION
    }

    // Parse file
    const { name, description, assetsRelativePath, canvas, ...rest } = json
    if (rest.length > 0 && !allowUnknownFields) {
      throw new Error('Unknown fields in scene file.')
    }

    if (!name) {
      throw new Error('Scene has no name.')
    }

    if (!description) {
      throw new Error('Scene has no description.')
    }

    // Make sure it falls back to defaults if they're not defined.
    // That is to not end up with a corrupt file when updating the version
    const safeProps = {}
    if (canvas) Object.assign(safeProps, canvas)
    if (assetsRelativePath) Object.assign(safeProps, assetsRelativePath)

    return {
      ...Scene.default(),
      name,
      version,
      description,
      ...safeProps,
    }
  }

  static addAssetsRelativePath(scene: Scene, assetsRelativePath: string) {
    return {
      ...scene,
      assetsRelativePath,
    }
  }
}
