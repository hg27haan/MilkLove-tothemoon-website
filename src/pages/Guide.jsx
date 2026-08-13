import React, { useState } from 'react'
import { useSiteData } from '../data/SiteDataContext'

export function Guide() {
  const { data: siteData } = useSiteData()
  const [active, setActive] = useState(0)
  const tab = siteData.guideTabs[active]
  return (
    <section className="guide-page">
      <div className="page-width">
        <div className="page-title light"><span>Knowledge</span><h1>Guide</h1></div>
        <div className="guide-tabs">
          {siteData.guideTabs.map((item, index) => <button key={item.name} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>{item.name}</button>)}
        </div>
        <div className="guide-list full">
          {tab.items.map(item => <article key={item.no}><div className="guide-no">{item.no}</div><div><h3>{item.title}</h3><p>{item.text}</p></div><div className="guide-type">{tab.name}</div></article>)}
        </div>
      </div>
    </section>
  )
}
