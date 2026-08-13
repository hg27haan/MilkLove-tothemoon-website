import React from 'react'
import { useSiteData } from '../data/SiteDataContext'

export function Stats() {
  const { data: siteData } = useSiteData()
  const max = Math.max(...siteData.stats.map(([, value]) => value))
  return (
    <section className="simple-page page-width">
      <div className="page-title"><span>Numbers</span><h1>Stats</h1></div>
      <div className="stat-cards">
        {siteData.stats.map(([label, value]) => (
          <article key={label}><span>{label}</span><strong>{value}</strong><div className="stat-bar"><i style={{width: `${(value/max)*100}%`}}></i></div></article>
        ))}
      </div>
    </section>
  )
}
