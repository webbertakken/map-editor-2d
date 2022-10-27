export class SceneMeta {
  public absolutePath: string = ''
  public sceneFileName: string = ''
  public hasLoaded: boolean = false

  static default() {
    return {
      absolutePath: '',
      sceneFileName: '',
      hasLoaded: false,
    }
  }

  static create(fullPathAndFileName: string) {
    const sceneFileName = fullPathAndFileName.replace(/^.*([\\/:])/, '')
    const absolutePath = fullPathAndFileName.replace(sceneFileName, '').replace(/[\\/]+$/, '')

    return {
      ...SceneMeta.default(),
      absolutePath,
      sceneFileName,
    }
  }
}
