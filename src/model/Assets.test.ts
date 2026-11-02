import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { DirEntry } from '@tauri-apps/plugin-fs'

const fs = vi.hoisted(() => ({
  tree: new Map<string, DirEntry[]>(),
  readDir: vi.fn(),
  readFile: vi.fn(),
}))

vi.mock('@tauri-apps/plugin-fs', () => ({ readDir: fs.readDir, readFile: fs.readFile }))
vi.mock('@tauri-apps/api/window', () => ({ getCurrentWindow: vi.fn(), PhysicalSize: vi.fn() }))

import '../init'
import { Assets } from './Assets'

const file = (name: string): DirEntry => ({
  name,
  isFile: true,
  isDirectory: false,
  isSymlink: false,
})
const directory = (name: string): DirEntry => ({
  name,
  isFile: false,
  isDirectory: true,
  isSymlink: false,
})

describe('Assets.loadSprites', () => {
  beforeEach(() => {
    fs.tree.clear()
    fs.readDir.mockReset().mockImplementation(async (path: string) => fs.tree.get(path) ?? [])
    fs.readFile.mockReset().mockResolvedValue(new Uint8Array([1, 2, 3]))
  })

  it('loads images from nested directories with paths relative to the scene', async () => {
    fs.tree.set('/project/assets', [file('hero.png'), directory('tiles')])
    fs.tree.set('/project/assets/tiles', [file('grass_tile.jpg')])

    const sprites = await Assets.loadSprites('/project', '/project/assets')

    expect(sprites.map(({ relativePath, name }) => ({ relativePath, name }))).toEqual([
      { relativePath: 'assets/hero.png', name: 'Hero' },
      { relativePath: 'assets/tiles/grass_tile.jpg', name: 'Grass tile' },
    ])
    expect(fs.readFile).toHaveBeenCalledWith('/project/assets/tiles/grass_tile.jpg')
  })

  it('encodes file contents as a base64 data url', async () => {
    fs.tree.set('/project/assets', [file('hero.png')])

    const [sprite] = await Assets.loadSprites('/project', '/project/assets')

    expect(sprite.src).toBe('data:image/png;base64,AQID')
  })

  it('normalises windows paths to forward slashes', async () => {
    fs.tree.set('C:/project/assets', [file('hero.png')])

    const sprites = await Assets.loadSprites('C:/project', 'C:\\project\\assets')

    expect(fs.readFile).toHaveBeenCalledWith('C:/project/assets/hero.png')
    expect(sprites[0].relativePath).toBe('assets/hero.png')
  })

  it('skips collider, tileset and unknown files without reading them', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    fs.tree.set('/project/assets', [file('a.collider'), file('b.2dtf'), file('notes.txt')])

    const sprites = await Assets.loadSprites('/project', '/project/assets')

    expect(sprites).toEqual([])
    expect(fs.readFile).not.toHaveBeenCalled()
    expect(warn).toHaveBeenCalledWith('Skipped: /project/assets/notes.txt (unhandled file type)')
    warn.mockRestore()
  })
})
