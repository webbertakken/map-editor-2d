import { REGEX_LEADING_SLASHES } from '../constants'

export class AssetPath {
  public static isInsideScenePath(sceneAbsolutePath: string, assetsAbsolutePath: string): boolean {
    // remove everything after & including the last backslash
    const pathToScene = sceneAbsolutePath.substring(0, sceneAbsolutePath.lastIndexOf('/'))

    return assetsAbsolutePath.includes(pathToScene)
  }

  /**
   * Paths should not include file names, or it won't work.
   */
  public static toRelative(sceneAbsolutePath: string, assetsAbsolutePath: string): string {
    // assets are directly inside the scene's directory
    if (sceneAbsolutePath === assetsAbsolutePath) return ''
    // Remove absolute path to scene
    return assetsAbsolutePath.replace(sceneAbsolutePath, '').replace(REGEX_LEADING_SLASHES, '')
  }

  static toAbsolute(sceneAbsolutePath: string, assetsRelativePath: string) {
    return `${sceneAbsolutePath}/${assetsRelativePath}`
  }
}
