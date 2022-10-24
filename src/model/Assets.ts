import { atom, selector } from 'recoil'
import { SpriteAsset } from './SpriteAsset'
import { readDir, FileEntry, readBinaryFile } from '@tauri-apps/api/fs'
import { Buffer } from 'buffer'

export class Assets {
  public spritesPath: string = ''
  public areSpritesLoaded: boolean = false
  public sprites: SpriteAsset[] = []

  public static default(): Assets {
    return {
      spritesPath: '',
      areSpritesLoaded: false,
      sprites: [],
    }
  }

  public static create(spritesPath: string, sprites: SpriteAsset[]): Assets {
    return {
      ...Assets.default(),
      areSpritesLoaded: true,
      spritesPath,
      sprites,
    }
  }

  public static async loadSprites(spritesAbsolutePath: string): Promise<SpriteAsset[]> {
    const sprites: SpriteAsset[] = []

    const processEntries = async (entries: FileEntry[]) => {
      for (const entry of entries) {
        const { children, path } = entry
        if (children !== undefined) {
          await processEntries(children)
          continue
        }

        if (path.endsWith('.png') || path.endsWith('.jpg')) {
          const data = await readBinaryFile(path)
          const buffer = Buffer.from(data)

          // noinspection TypeScriptValidateJSTypes (incorrect assertion, base64 is indeed required)
          const base64 = buffer.toString('base64')
          const dataUrl = `data:image/png;base64,${base64}`

          sprites.push(SpriteAsset.create(entry.path, dataUrl))
          continue
        }

        console.log(`Skipped: ${path}`)
      }
    }

    const entries = await readDir(spritesAbsolutePath, { recursive: true })
    await processEntries(entries)

    return sprites
  }
}

export const assetsState = atom<Assets>({
  key: 'assets',
  default: Assets.default(),
})

export const spritesSelector = selector({
  key: 'spritesAssets',
  get: ({ get }) => get(assetsState).sprites,
})

export const areSpritesAssetsLoadedSelector = selector({
  key: 'areSpriteAssetsLoaded',
  get: ({ get }) => get(assetsState).areSpritesLoaded,
})
