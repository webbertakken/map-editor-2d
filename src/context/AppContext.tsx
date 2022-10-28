import React, { createContext, createRef } from 'react'
import { SpriteAsset } from '../model/SpriteAsset'
import { HotkeyNotifier } from '../service/HotkeyNotifier'

export interface AppContextProps {
  dragAndDropRef: Writeable<React.RefObject<SpriteAsset | null>>
  hotkeys: HotkeyNotifier
}

export const AppContext = createContext<AppContextProps>({
  dragAndDropRef: createRef<SpriteAsset>(),
  hotkeys: new HotkeyNotifier(),
})

AppContext.displayName = 'AppContext'
