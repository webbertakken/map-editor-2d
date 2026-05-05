import { describe, expect, it } from 'vitest'

import { AssetPath } from './AssetPath'

describe('AssetPath.isInsideScenePath', () => {
  it('returns true when assets are in the same directory as the scene file', () => {
    expect(AssetPath.isInsideScenePath('/project/scene.json', '/project/sprite.png')).toBe(true)
  })

  it('returns true when assets are nested under the scene directory', () => {
    expect(AssetPath.isInsideScenePath('/project/scene.json', '/project/assets/sprite.png')).toBe(
      true,
    )
  })

  it('returns false when assets live outside the scene directory', () => {
    expect(AssetPath.isInsideScenePath('/project/scene.json', '/elsewhere/sprite.png')).toBe(false)
  })
})

describe('AssetPath.toRelative', () => {
  it('returns an empty string when the asset is at the scene path itself', () => {
    expect(AssetPath.toRelative('/project', '/project')).toBe('')
  })

  it('strips the scene path prefix to produce a relative path', () => {
    expect(AssetPath.toRelative('/project', '/project/assets/sprite.png')).toBe('assets/sprite.png')
  })

  it('strips leading slashes from the resulting relative path', () => {
    expect(AssetPath.toRelative('/project', '/project/sprite.png')).toBe('sprite.png')
  })
})

describe('AssetPath.toAbsolute', () => {
  it('joins the scene absolute path with the asset relative path', () => {
    expect(AssetPath.toAbsolute('/project', 'assets/sprite.png')).toBe('/project/assets/sprite.png')
  })

  it('handles an empty relative path (asset directly in the scene dir)', () => {
    expect(AssetPath.toAbsolute('/project', '')).toBe('/project/')
  })
})
