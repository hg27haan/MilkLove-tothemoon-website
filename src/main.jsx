import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { SiteDataProvider } from './data/SiteDataContext'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteDataProvider><App /></SiteDataProvider>
  </React.StrictMode>
)
