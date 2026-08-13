import React from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { useLanguage } from '../i18n/LanguageContext'
import { HeroSlider } from '../components/HeroSlider'
import { Countdown } from '../components/Countdown'
import { SectionTitle } from '../components/SectionTitle'
import { Link } from '../components/Layout'
import { getHomeNews, getHomeSchedule } from '../lib/homePreview'
import { shouldShowNewBadge } from '../lib/newsBadge'

function NewsEntry({ item, newBadge, site }) {
  const showNew = shouldShowNewBadge(item, site)
  const inner = (
    <>
      <div className="entry-image">
        <img src={item.image} alt="" />
      </div>
      <div className="entry-text">
        {showNew && <div className="entry-new wf">{newBadge}</div>}
        <h3 className="entry-title">{item.title}</h3>
        <div className="entry-date">{item.date}</div>
      </div>
    </>
  )

  if (item.url?.startsWith('http')) {
    return <a href={item.url} className="entry-body" target="_blank" rel="noreferrer">{inner}</a>
  }

  return <Link to={item.url || '/news'} className="entry-body">{inner}</Link>
}

function parseScheduleDate(dateStr) {
  const parts = String(dateStr || '').trim().split(/\s+/)
  if (parts.length >= 3) {
    return { day: parts[0], monthYear: `${parts[1]} ${parts[2]}` }
  }
  return { day: '—', monthYear: dateStr || '' }
}

export function Home() {
  const { data: siteData } = useSiteData()
  const { t, lang } = useLanguage()
  const countdownLabel = lang === 'vi'
    ? (siteData.countdown.labelVi || siteData.countdown.label)
    : siteData.countdown.label
  const showCountdown = siteData.countdown?.enabled !== false
  const homeNews = getHomeNews(siteData.news)
  const homeSchedule = getHomeSchedule(siteData.schedule)

  return (
    <div className="home-page">
      <HeroSlider banners={siteData.banners} />

      {showCountdown && (
        <section className="home-section countdown-section">
          <div className="countdown-block">
            <p className="countdown-label wf">{countdownLabel}</p>
            <Countdown target={siteData.countdown.target} />
          </div>
        </section>
      )}

      <section className="home-section news-section">
        <SectionTitle>{t.home.whatsNew}</SectionTitle>
        <div className="section-body">
          <div className="news-grid">
            {homeNews.map(item => (
              <NewsEntry key={item.id} item={item} newBadge={t.news.badge} site={siteData.site} />
            ))}
          </div>
        </div>
        <div className="section-nav">
          <Link to="/news" className="btn-primary">{t.home.seeMore}</Link>
        </div>
      </section>

      <section className="home-section home-schedule-section">
        <SectionTitle>{t.home.schedule}</SectionTitle>
        <div className="section-body">
          <div className="home-schedule-list">
            {homeSchedule.map((event, index) => {
              const { day, monthYear } = parseScheduleDate(event.date)
              return (
                <article className="home-schedule-ticket" key={`${event.title}-${index}`}>
                  <div className="home-schedule-ticket-date">
                    <span className="home-schedule-ticket-day wf">{day}</span>
                    <span className="home-schedule-ticket-month">{monthYear}</span>
                  </div>
                  <div className="home-schedule-ticket-notch" aria-hidden="true" />
                  <div className="home-schedule-ticket-body">
                    <span className="home-schedule-ticket-type">{event.type}</span>
                    <h3 className="home-schedule-ticket-title wf">{event.title}</h3>
                    <p className="home-schedule-ticket-city">{event.city}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        <div className="section-nav">
          <Link to="/schedule" className="btn-primary">{t.home.seeMore}</Link>
        </div>
      </section>
    </div>
  )
}
