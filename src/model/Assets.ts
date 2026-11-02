import { SpriteAsset } from './SpriteAsset'
import { readDir, readFile } from '@tauri-apps/plugin-fs'
import { Buffer } from 'buffer'
import { AssetPath } from './AssetPath'
import { Path } from './Path'

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

    const readFilesRecursively = async (directory: string) => {
      for (const entry of await readDir(directory)) {
        const path = `${directory}/${entry.name}`
        if (entry.isDirectory) {
          await readFilesRecursively(path)
          continue
        }

        const extension = path.substring(path.lastIndexOf('.'))
        switch (extension) {
          case '.png':
          case '.jpg':
            const data = await readFile(path)
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

    await readFilesRecursively(Path.normalise(spritesAbsolutePath))

    return sprites
  }
}
