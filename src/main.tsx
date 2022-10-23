import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import Layout from './components/layout/Layout'
import Menu from './components/menu/Menu'
import ProjectPanel from './components/project-panel/ProjectPanel'
import { Canvas } from './components/canvas/Canvas'
import DetailsPanel from './components/details-panel/DetailsPanel'
import 'dracula-ui/styles/dracula-ui.css'
import Sidebar from './components/layout/Sidebar'
import Main from './components/layout/Main'
import { Toaster } from 'react-hot-toast'
import ReactModal from 'react-modal'

// Needed for accessibility: https://reactcommunity.org/react-modal/accessibility/
ReactModal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>,
)
