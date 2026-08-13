import React from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Link } from '../components/Layout'

function formatProjectDate(date) {
  if (!date) return ''
  return date.replace(/,/g, '.').replace(/\s/g, '')
}

export function ProjectDetail({ slug }) {
  const { data: siteData } = useSiteData()
  const { t, lang } = useLanguage()
  const project = (siteData.projects || []).find(item => item.slug === slug)

  if (!project) {
    return (
      <div className="sub-page project-page">
        <div className="container">
          <div className="project-shell project-detail-shell">
            <p>{t.project.notFound}</p>
            <Link to="/project" className="btn-primary">{t.project.back}</Link>
          </div>
        </div>
      </div>
    )
  }

  const title = lang === 'vi' ? (project.titleVi || project.title) : project.title
  const content = lang === 'vi' ? (project.contentVi || project.content) : project.content
  const dateLabel = formatProjectDate(project.date)

  return (
    <div className="sub-page project-page">
      <div className="container">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">{t.project.home}</Link>
          <span>/</span>
          <Link to="/project">{t.project.title}</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>

        <div className="project-shell project-detail-shell">
          <div className="project-detail-grid">
            <div className="project-detail-image">
              <img src={project.image} alt="" />
            </div>
            <div className="project-detail-copy">
              <p className="project-item-date">- {dateLabel} -</p>
              <h1 className="project-detail-title wf">{title}</h1>
              {content && <div className="project-detail-content">{content}</div>}
              {project.externalLink?.startsWith('http') && (
                <a href={project.externalLink} className="btn-primary btn-outline" target="_blank" rel="noreferrer">
                  {t.project.openLink}
                </a>
              )}
              <Link to="/project" className="project-back-link">{t.project.back}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
