import React from 'react'
import { useSiteData } from '../data/SiteDataContext'

export function Stats() {
  const { data: siteData } = useSiteData()
  const max = Math.max(...siteData.stats.map(stat => stat.value))
  return (
    <section className="simple-page page-width">
      <div className="page-title"><span>Numbers</span><h1>Stats</h1></div>
      <div className="stat-cards">
        {siteData.stats.map(stat => (
          <article key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong><div className="stat-bar"><i style={{width: `${(stat.value/max)*100}%`}}></i></div></article>
        ))}
      </div>
    </section>
  )
}
