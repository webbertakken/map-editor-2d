import React, { createContext, createRef } from 'react'

interface Props {
  dragAndDropRef: React.RefObject<HTMLDivElement>
}

export const DragAndDropContext = createContext<Props>({
  dragAndDropRef: createRef<HTMLDivElement>(),
})
