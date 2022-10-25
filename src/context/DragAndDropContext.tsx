import React, { createContext, createRef } from 'react'
import { SpriteAsset } from '../model/SpriteAsset'

export interface DragAndDropContextProps {
  dragAndDropRef: Writeable<React.RefObject<SpriteAsset | null>>
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  dragAndDropRef: createRef<SpriteAsset>(),
})

DragAndDropContext.displayName = 'DragAndDropContext'
