import React, { useMemo, useState } from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Link } from '../components/Layout'
import { SectionTitle } from '../components/SectionTitle'

const PER_PAGE = 5

function formatProjectDate(date) {
  if (!date) return ''
  return date.replace(/,/g, '.').replace(/\s/g, '')
}

function ProjectItem({ item, title, dateLabel }) {
  return (
    <Link to={`/project/${item.slug}`} className="project-item-link">
      <article className="project-item">
        <div className="project-item-image">
          <img src={item.image} alt="" />
        </div>
        <div className="project-item-body">
          <h3 className="project-item-title">{title}</h3>
          <p className="project-item-date">- {dateLabel} -</p>
        </div>
      </article>
    </Link>
  )
}

export function Projects() {
  const { data: siteData } = useSiteData()
  const { t, lang } = useLanguage()
  const [page, setPage] = useState(1)

  const projects = siteData.projects || []
  const totalPages = Math.max(1, Math.ceil(projects.length / PER_PAGE))

  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE
    return projects.slice(start, start + PER_PAGE)
  }, [projects, page])

  return (
    <div className="sub-page project-page">
      <div className="container">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">{t.project.home}</Link>
          <span>/</span>
          <span>{t.project.title}</span>
        </nav>

        <div className="project-shell">
          <SectionTitle>{t.project.title}</SectionTitle>
          <p className="project-subtitle wf">{t.project.subtitle}</p>

          {totalPages > 1 && (
            <div className="project-pagination">
              <button
                type="button"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                ‹
              </button>
              <span className="project-page-num">{page}</span>
              <button
                type="button"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}

          <div className="project-list">
            {pageItems.length === 0 && (
              <p className="project-empty">{t.project.empty}</p>
            )}
            {pageItems.map(item => {
              const title = lang === 'vi' ? (item.titleVi || item.title) : item.title
              const dateLabel = formatProjectDate(item.date)
              return (
                <ProjectItem
                  key={item.id}
                  item={item}
                  title={title}
                  dateLabel={dateLabel}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
