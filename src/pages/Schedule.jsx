import React from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { useLanguage } from '../i18n/LanguageContext'
import { SectionTitle } from '../components/SectionTitle'
import { parseScheduleDate, sortByDateDesc } from '../lib/dateParse'

export function Schedule() {
  const { data: siteData } = useSiteData()
  const { t } = useLanguage()
  const scheduleItems = sortByDateDesc(siteData.schedule, item => parseScheduleDate(item.date))

  return (
    <section className="sub-page container">
      <SectionTitle>{t.schedule.title}</SectionTitle>
      <div className="schedule-list">
        {scheduleItems.map((item, index) => (
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
