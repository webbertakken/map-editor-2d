import { REGEX_FILE_EXTENSION } from '../constants'

export class AssetPath {
  public static isInsideScenePath(scenePath: string, assetsPath: string): boolean {
    // remove everything after & including the last backslash
    const pathToScene = scenePath.substring(0, scenePath.lastIndexOf('\\'))

    return assetsPath.includes(pathToScene)
  }

  public static toRelative(scenePath: string, assetsPath: string): string {
    // remove everything after & including the last backslash
    const pathToScene = scenePath.substring(0, scenePath.lastIndexOf('\\'))

    return assetsPath.replace(pathToScene, '').replace(REGEX_FILE_EXTENSION, '')
  }
}
