export class SpriteAsset {
  public id: string = ''
  public name: string = ''
  public relativePath: string = ''
  public src: string = ''

  static create(relativePath: string, src: string): SpriteAsset {
    return {
      id: relativePath, // Easy-mode identifier that doesn't require persistence between sessions
      name: relativePath.substring(relativePath.lastIndexOf('\\') + 1).replace(/\.[^/\\.]+$/, ''),
      relativePath,
      src,
    }
  }
}
