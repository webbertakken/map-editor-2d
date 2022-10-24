import { v4 as uuidv4 } from 'uuid'

/**
 * These fields are represent both the canvas and the map file.
 */
export class SpriteInstance {
  // Unique id
  public id: string = ''
  // Position in 2D space
  public position: Translation = { x: 0, y: 0, z: 0 }
  // Rotation in 2D space (Z-axis)
  public rotation: Rotation = 0
  // Scale in 2D space
  public scale: Scale = { x: 1, y: 1, z: 1 }
  // Opacity
  public opacity: number = 1

  static createFromDragAndDrop(x: any, y: any): SpriteInstance {
    return {
      id: uuidv4(),
      position: { x, y, z: 1 },
      rotation: 0,
      scale: { x: 1, y: 1, z: 1 },
      opacity: 1,
    }
  }
}
