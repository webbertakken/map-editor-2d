import { atom, selector } from 'recoil'
import { SpriteAsset } from './SpriteAsset'
import { readDir, FileEntry, readBinaryFile } from '@tauri-apps/api/fs'
import { Buffer } from 'buffer'
import { AssetPath } from './AssetPath'
import { REGEX_FILE_EXTENSION } from '../constants'

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

  public static async loadSprites(
    scenePath: string,
    spritesAbsolutePath: string,
  ): Promise<SpriteAsset[]> {
    const sprites: SpriteAsset[] = []

    const processEntries = async (entries: FileEntry[]) => {
      for (const entry of entries) {
        const { children, path } = entry
        if (children !== undefined) {
          await processEntries(children)
          continue
        }

        const extension = path.substring(path.lastIndexOf('.'))
        switch (extension) {
          case '.png':
          case '.jpg':
          case '.jpeg':
            const data = await readBinaryFile(path)
            const buffer = Buffer.from(data)

            // noinspection TypeScriptValidateJSTypes (incorrect assertion, base64 is indeed required)
            const base64 = buffer.toString('base64')
            const src = `data:image/png;base64,${base64}`

            const relativePath = AssetPath.toRelative(scenePath, path)

            sprites.push(SpriteAsset.create(relativePath, src))
            continue
          case '.collider':
          case '.2dtf':
            continue
          default:
            console.warn(`Skipped: ${path} (unhandled file type)`)
        }
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

export const spriteAssetsSelector = selector({
  key: 'spritesAssets',
  get: ({ get }) => get(assetsState).sprites,
})

export const areSpritesAssetsLoadedSelector = selector({
  key: 'areSpriteAssetsLoaded',
  get: ({ get }) => get(assetsState).areSpritesLoaded,
})
