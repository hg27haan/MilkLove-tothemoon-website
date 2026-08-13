import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export function LanguageSwitch({ className = '' }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language">
      <button
        type="button"
        className={lang === 'en' ? 'active' : ''}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === 'vi' ? 'active' : ''}
        onClick={() => setLang('vi')}
      >
        VI
      </button>
    </div>
  )
}
