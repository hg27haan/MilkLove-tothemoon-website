import React from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { Link } from '../components/Layout'
import { SectionTitle } from '../components/SectionTitle'

export function News() {
  const { data: siteData } = useSiteData()

  return (
    <div className="sub-page news-page">
      <div className="container">
        <SectionTitle>News</SectionTitle>
        <div className="news-grid full">
          {siteData.news.map(item => {
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
              return (
                <a key={item.id} href={item.url} className="entry-body" target="_blank" rel="noreferrer">{inner}</a>
              )
            }

            return <Link key={item.id} to={item.url || '#'} className="entry-body">{inner}</Link>
          })}
        </div>
      </div>
    </div>
  )
}
