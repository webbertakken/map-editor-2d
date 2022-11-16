import { Scene } from '../model/Scene'
import { Assets } from '../model/Assets'
import { SpriteMeta } from '../model/SpriteMeta'
import { SpriteData } from '../model/SpriteData'

export class CanvasLoader {
  static async loadSprites(scene: Scene, assets: Assets): Promise<Sprites> {
    const metas: SpriteMeta[] = []
    const datas: SpriteData[] = []

    scene.canvas.sprites.map((sprite) => {
      const asset = assets.sprites.find((asset) => asset.id === sprite.relativePath)

      if (!asset) {
        throw new Error(`Could not find asset for sprite ${sprite.relativePath}`)
      }

      let spriteData = SpriteData.fromSceneFile(sprite)

      datas.push(spriteData)
      metas.push(SpriteMeta.fromSpriteAndAsset(spriteData, asset))
    })

    return { datas, metas }
  }
}
