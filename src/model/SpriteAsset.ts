import { REGEX_FILE_EXTENSION } from '../constants'

export class SpriteAsset {
  public id: string = ''
  public name: string = ''
  public relativePath: string = ''
  public src: string = ''

  static create(relativePath: string, src: string): SpriteAsset {
    const name = relativePath
      .substring(relativePath.lastIndexOf('/') + 1)
      .replace(REGEX_FILE_EXTENSION, '')
      .replace(/[-_]/g, ' ')
      .capitaliseFirstLetter()

    return {
      id: relativePath, // Easy-mode identifier that doesn't require persistence between sessions
      name,
      relativePath,
      src,
    }
  }
}
