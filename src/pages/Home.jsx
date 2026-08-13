import React from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { HeroSlider } from '../components/HeroSlider'
import { Countdown } from '../components/Countdown'
import { SectionTitle } from '../components/SectionTitle'
import { Link } from '../components/Layout'

function NewsEntry({ item }) {
  const inner = (
    <>
      <div className="entry-image">
        <img src={item.image} alt="" />
      </div>
      <div className="entry-text">
        {item.isNew && <div className="entry-new wf">NEW</div>}
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

export function Home() {
  const { data: siteData } = useSiteData()

  return (
    <div className="home-page">
      <HeroSlider banners={siteData.banners} />

      <section className="home-section countdown-section">
        <div className="countdown-block">
          <p className="countdown-label wf">{siteData.countdown.label}</p>
          <Countdown target={siteData.countdown.target} />
        </div>
      </section>

      <section className="home-section news-section">
        <SectionTitle>What's New?</SectionTitle>
        <div className="section-body">
          <div className="news-grid">
            {siteData.news.slice(0, 6).map(item => (
              <NewsEntry key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="section-nav">
          <Link to="/news" className="btn-primary">see more</Link>
        </div>
      </section>

      <section className="home-section tour-section">
        <SectionTitle>Schedule</SectionTitle>
        <div className="section-body">
          <div className="tour-list">
            {siteData.schedule.slice(0, 4).map((event, index) => (
              <div className="tour-entry" key={`${event.title}-${index}`}>
                <table>
                  <tbody>
                    <tr>
                      <th>{event.date}</th>
                      <td>{event.city}</td>
                    </tr>
                    <tr>
                      <th>{event.type}</th>
                      <td>{event.title}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
        <div className="section-nav">
          <Link to="/schedule" className="btn-primary">see more</Link>
        </div>
      </section>
    </div>
  )
}
