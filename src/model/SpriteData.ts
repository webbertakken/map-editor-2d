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
  // Whether you can drag the sprite
  public locked: boolean = false

  static createFromDragAndDrop(
    x: number,
    y: number,
    relativePath: string,
    defaults: DefaultPropertiesProps,
  ): SpriteData {
    const { z } = defaults.position
    return {
      id: uuidv4(),
      ...defaults,
      position: { x, y, z },
      relativePath,
    }
  }

  static default() {
    return {} as SpriteData
  }
}
