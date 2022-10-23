import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import Layout from './components/layout/Layout'
import Menu from './components/menu/Menu'
import ProjectPanel from './components/project-panel/ProjectPanel'
import { Canvas } from './components/canvas/Canvas'
import DetailsPanel from './components/details-panel/DetailsPanel'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout menu={<Menu />} left={<ProjectPanel />} main={<Canvas />} right={<DetailsPanel />} />
  </React.StrictMode>,
)
