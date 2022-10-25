import React, { createRef } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import 'dracula-ui/styles/dracula-ui.css'
import { initialiseApplication } from './init'
import Layout from './components/layout/Layout'
import Menu from './components/menu/Menu'
import ProjectPanel from './components/project-panel/ProjectPanel'
import { Canvas } from './components/canvas/Canvas'
import DetailsPanel from './components/details-panel/DetailsPanel'
import Sidebar from './components/layout/Sidebar'
import Main from './components/layout/Main'
import { Toaster } from 'react-hot-toast'
import ReactModal from 'react-modal'
import { RecoilRoot } from 'recoil'
import { DragAndDropContext } from './context/DragAndDropContext'

// Global stuff
initialiseApplication().then(() => console.info('Application initialised'))

// Needed for accessibility: https://reactcommunity.org/react-modal/accessibility/
ReactModal.setAppElement('#root')

// Mount application
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <DragAndDropContext.Provider
        value={{
          dragAndDropRef: createRef<string>(),
        }}
      >
        <Toaster />

        <Layout menu={<Menu />}>
          <Sidebar left>
            <ProjectPanel />
          </Sidebar>
          <Main>
            <Canvas />
          </Main>
          <Sidebar right>
            <DetailsPanel />
          </Sidebar>
        </Layout>
      </DragAndDropContext.Provider>
    </RecoilRoot>
  </React.StrictMode>,
)
