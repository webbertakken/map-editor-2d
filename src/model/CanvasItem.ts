import { SpriteInstance } from './SpriteInstance'

/**
 * Wrapper that holds application data.
 */
export class CanvasSpriteData extends SpriteInstance implements CanvasItemProps {
  // Needed to keep track of whether the item is being dragged
  public isDragging: boolean = false
  // The in-memory representation of the sprite
  public src: any = null

  static fromDragAndDrop(current: HTMLDivElement | null, x: any, y: any): CanvasSpriteData {
    const spriteInstance = SpriteInstance.createFromDragAndDrop(x, y)

    let src = current

    return {
      isDragging: false,
      src,
      ...spriteInstance,
    }
  }
}
