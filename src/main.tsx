import React from 'react'
import ReactDOM from 'react-dom/client'
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

import './style.css'
import 'dracula-ui/styles/dracula-ui.css'

// Needed for accessibility: https://reactcommunity.org/react-modal/accessibility/
ReactModal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
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
    </RecoilRoot>
  </React.StrictMode>,
)
