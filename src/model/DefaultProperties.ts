export class DefaultProperties implements Partial<SpriteData> {
  public static default(): DefaultPropertiesProps {
    return {
      position: { x: 0, y: 0, z: 1 },
      rotation: 0,
      scale: { x: '1.0', y: '1.0', z: '1.0' },
      opacity: 1,
    }
  }
}
