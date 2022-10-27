import { Scene } from '../model/Scene'
import { Assets } from '../model/Assets'
import { SpriteMeta } from '../model/SpriteMeta'

export class CanvasLoader {
  static async loadSprites(scene: Scene, assets: Assets): Promise<Sprites> {
    const metas: SpriteMeta[] = []
    const datas: SpriteData[] = []

    scene.canvas.sprites.map((sprite) => {
      const asset = assets.sprites.find((asset) => asset.id === sprite.relativePath)

      if (!asset) {
        throw new Error(`Could not find asset for sprite ${sprite.relativePath}`)
      }

      metas.push(SpriteMeta.fromSpriteAndAsset(sprite, asset))
      datas.push(sprite)
    })

    return { datas, metas }
  }
}
