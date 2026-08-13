import React from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { useLanguage } from '../i18n/LanguageContext'
import { SectionTitle } from '../components/SectionTitle'

export function Schedule() {
  const { data: siteData } = useSiteData()
  const { t } = useLanguage()
  return (
    <section className="sub-page container">
      <SectionTitle>{t.schedule.title}</SectionTitle>
      <div className="schedule-list">
        {siteData.schedule.map((item, index) => (
          <article key={`${item.date}-${index}`}>
            <div className="schedule-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="schedule-date">{item.date}</div>
            <div className="schedule-main"><h2>{item.title}</h2><p>{item.city}</p></div>
            <span className="schedule-type">{item.type}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
