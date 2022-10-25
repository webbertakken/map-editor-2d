import { Scene } from '../model/Scene'
import { Assets } from '../model/Assets'
import { CanvasSpriteData } from '../model/CanvasSpriteData'

export class CanvasLoader {
  static async loadSprites(scene: Scene, assets: Assets): Promise<CanvasSpriteData[]> {
    return scene.canvas.sprites.map((sprite) => {
      const asset = assets.sprites.find((asset) => asset.id === sprite.relativePath)

      if (!asset) {
        throw new Error(`Could not find asset for sprite ${sprite.relativePath}`)
      }

      return CanvasSpriteData.fromSpriteAndAsset(sprite, asset)
    })
  }
}
