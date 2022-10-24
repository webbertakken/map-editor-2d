// IntRange: Source: https://stackoverflow.com/a/39495173/3593896
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

// A point in 2D space
interface Vector3 {
  x: number
  y: number
  z: number
}

// Position of the entity. In 2d, the last value of the Vec3 is used for z-ordering.
interface Translation extends Vector3 {}

// Rotation of the entity, in degrees (°).
type Rotation = IntRange<0, 360>

// Scale of the entity.
interface Scale extends Vector3 {}
