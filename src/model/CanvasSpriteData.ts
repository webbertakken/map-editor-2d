import { SpriteInstance } from './SpriteInstance'
import { SpriteAsset } from './SpriteAsset'

/**
 * Wrapper that holds application data.
 */
export class CanvasSpriteData extends SpriteInstance implements CanvasItemProps {
  // Needed to keep track of whether the item is being dragged
  public isDragging: boolean = false
  // The in-memory representation of the sprite
  public src: any = null
  // The id of the SpriteAsset
  public assetId: string = ''
  // Name
  public name: string = ''

  static createFromSpriteAsset(spriteAsset: SpriteAsset, x: any, y: any): CanvasSpriteData {
    const { id, name, relativePath, src } = spriteAsset

    const spriteInstance = SpriteInstance.createFromDragAndDrop(x, y, relativePath)

    return {
      assetId: id,
      name,
      isDragging: false,
      src,
      ...spriteInstance,
    }
  }
}
