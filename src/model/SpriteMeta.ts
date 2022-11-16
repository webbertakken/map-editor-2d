import { SpriteAsset } from './SpriteAsset'

/**
 * Non-persistent information about the sprite that's only required on runtime.
 */
export class SpriteMeta implements CanvasItemMeta {
  // The id of the persisted item to link to
  id: string = ''
  // The id of the asset
  assetId: string = ''
  // Name of the asset
  name: string = ''
  // The in-memory representation of the sprite
  src: any = null
  // Needed to keep track of whether the item is being dragged
  isDragging: boolean = false
  // Size
  spriteWidth: number = 100
  spriteHeight: number = 100

  static default() {
    const { ...defaults } = new SpriteMeta()

    return defaults
  }

  static createFromSpriteAsset(id: string, spriteAsset: SpriteAsset): SpriteMeta {
    const { id: assetId, name, src } = spriteAsset

    return {
      ...SpriteMeta.default(),
      id,
      assetId,
      name,
      src,
    }
  }

  static fromSpriteAndAsset(sprite: SpriteData, asset: SpriteAsset): SpriteMeta {
    return {
      ...SpriteMeta.default(),
      id: sprite.id,
      assetId: asset.id,
      name: asset.name,
      src: asset.src,
    }
  }
}
