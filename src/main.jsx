import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { SiteDataProvider } from './data/SiteDataContext'
import { LanguageProvider } from './i18n/LanguageContext'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <SiteDataProvider><App /></SiteDataProvider>
    </LanguageProvider>
  </React.StrictMode>
)
