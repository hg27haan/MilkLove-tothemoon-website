import React, { useMemo, useState } from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { useLanguage } from '../i18n/LanguageContext'
import { WorkCard } from '../components/WorkCard'
import { SectionTitle } from '../components/SectionTitle'

export function Works() {
  const { data: siteData } = useSiteData()
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [year, setYear] = useState('All')
  const allLabel = t.works.all

  const categories = [allLabel, ...new Set(siteData.works.map(item => item.category))]
  const years = [allLabel, ...new Set(siteData.works.map(item => item.year))]

  const filtered = useMemo(() => siteData.works.filter(work => {
    const q = search.trim().toLowerCase()
    const matchesSearch = !q || `${work.title} ${work.roles} ${work.tag}`.toLowerCase().includes(q)
    const matchesCategory = category === allLabel || work.category === category
    const matchesYear = year === allLabel || work.year === year
    return matchesSearch && matchesCategory && matchesYear
  }), [search, category, year, siteData.works, allLabel])

  return (
    <section className="sub-page container">
      <div className="stats-strip">
        {siteData.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </div>
      <SectionTitle>{t.works.title}</SectionTitle>

      <div className="filters-panel">
        <label className="search-field"><span>{t.works.searchFilters}</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.works.search}/></label>
        <label><span>{t.works.category}</span><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(x => <option key={x}>{x}</option>)}</select></label>
        <label><span>{t.works.year}</span><select value={year} onChange={e => setYear(e.target.value)}>{years.map(x => <option key={x}>{x}</option>)}</select></label>
      </div>

      <div className="result-count">{filtered.length} {t.works.results}</div>
      <div className="works-grid">{filtered.map(work => <WorkCard key={work.id} work={work}/>)}</div>
    </section>
  )
}
