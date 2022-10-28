import { v4 as uuidv4 } from 'uuid'

/**
 * Persistent data for a sprite
 */
export class SpriteData {
  // Unique id
  public id: string = ''
  // Position in 2D space
  public position: Translation = { x: 0.0, y: 0.0, z: 0.0 }
  // Rotation in 2D space (Z-axis)
  public rotation: Rotation = 0
  // Scale in 2D space
  public scale: Scale = { x: '1.0', y: '1.0', z: '1.0' }
  // Opacity
  public opacity: number = 1
  // Relative path to the asset
  public relativePath: string = ''

  static createFromDragAndDrop(x: number, y: number, relativePath: string): SpriteData {
    return {
      id: uuidv4(),
      position: { x, y, z: 1 },
      rotation: 0,
      scale: { x: '1.0', y: '1.0', z: '1.0' },
      opacity: 1,
      relativePath,
    }
  }

  static default() {
    return {} as SpriteData
  }
}
