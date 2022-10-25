export class SceneMeta {
  public absolutePath: string = ''
  public sceneFileName: string = ''

  static default() {
    return {
      absolutePath: '',
      sceneFileName: '',
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
