// Writable: Source: https://stackoverflow.com/a/43001581/3593896
type Writeable<T> = { -readonly [P in keyof T]: T[P] }
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

// IntRange: Source: https://stackoverflow.com/a/39495173/3593896
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

// String extension methods
interface String {
  capitaliseFirstLetter(...strings: string[]): string
}

// A point in 2D space
interface Vector3 {
  x: number
  y: number
  z: number
}

// A point of 2D space, represented using strings to store more accuracy.
// See: https://github.com/tc39/proposal-decimal for more details.
interface PreciseVector3 {
  x: string
  y: string
  z: string
}

// Position of the entity. In 2d, the last value of the Vec3 is used for z-ordering.
interface Translation extends Vector3 {}

// Rotation of the entity, in degrees (°).
type Rotation = IntRange<0, 360>

// Scale of the entity.
interface Scale extends PreciseVector3 {}

/**
 * Information about the canvas item.
 * Only required on runtime.
 * This data is non-persistent.
 */
interface CanvasItemMeta {
  // The id of the persisted item to link to
  id: string
  // The id of the asset
  assetId: string
  // Name of the asset
  name: string
  // The in-memory representation of the sprite
  src: any
  // Needed to keep track of whether the item is being dragged
  isDragging: boolean
  // Size
  spriteWidth: number
  spriteHeight: number
}

interface SpriteMeta extends CanvasItemMeta {}
interface SpriteData {
  // Unique id
  id: string
  // Position in 2D space
  position: Translation
  // Rotation in 2D space (Z-axis)
  rotation: Rotation
  // Scale in 2D space
  scale: Scale
  // Opacity
  opacity: number
  // Relative path to the asset
  relativePath: string
  // Whether you can drag the sprite
  locked: boolean
  // Whether it can move as an object or not.
  isStatic: boolean
  // Weight
  useSizeForWeight: boolean
  sizeToWeightMultiplier: number
  weight: number
}

interface Sprites {
  datas: SpriteData[]
  metas: SpriteMeta[]
}

type DefaultPropertiesProps = Omit<SpriteData, 'id' | 'relativePath'>
