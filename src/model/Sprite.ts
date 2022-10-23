export class Sprite {
  public name: string = ''
  public path: string = ''
  public dataUrl: string = ''

  static create(path: string, dataUrl: string): Sprite {
    return {
      name: path.substring(path.lastIndexOf('\\') + 1),
      path,
      dataUrl,
    }
  }
}
