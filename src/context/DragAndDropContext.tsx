import React, { createContext, createRef } from 'react'

export interface DragAndDropContextProps {
  dragAndDropRef: Writeable<React.RefObject<string>>
}

export const DragAndDropContext = createContext<DragAndDropContextProps>({
  dragAndDropRef: createRef<string>(),
})

DragAndDropContext.displayName = 'DragAndDropContext'
