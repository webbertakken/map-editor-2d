import { AssetPath } from '../model/AssetPath'
import { Assets } from '../model/Assets'

export class AssetsLoader {
  static async loadAssets(scenePath: string, assetsAbsolutePath: string) {
    // Make sure it's a subdirectory of the scene
    if (!AssetPath.isInsideScenePath(scenePath, assetsAbsolutePath)) {
      throw new Error('The selected directory is not inside the scene directory')
    }

    // Load the actual files
    const sprites = await Assets.loadSprites(scenePath, assetsAbsolutePath)

    // Return to method that can modify state
    const assetsRelativePath = AssetPath.toRelative(scenePath, assetsAbsolutePath)
    return Assets.create(assetsRelativePath, sprites)
  }
}
