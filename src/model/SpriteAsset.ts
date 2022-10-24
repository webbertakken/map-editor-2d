export class SpriteAsset {
  public name: string = ''
  public path: string = ''
  public dataUrl: string = ''

  static create(path: string, dataUrl: string): SpriteAsset {
    return {
      name: path.substring(path.lastIndexOf('\\') + 1),
      path,
      dataUrl,
    }
  }
}
