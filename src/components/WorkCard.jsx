import React from 'react'

export function WorkCard({ work, compact = false }) {
  return (
    <article className={`work-card ${compact ? 'compact' : ''}`}>
      <div className="work-image-wrap">
        <img src={work.image} alt={work.title} />
        <span className="work-year">{work.year}</span>
      </div>
      <div className="work-body">
        <div className="work-meta"><span>{work.category}</span><span>{work.date}</span></div>
        <h3>{work.title}</h3>
        <p>{work.roles}</p>
        <div className="work-footer"><span>{work.tag}</span><span>↗</span></div>
      </div>
    </article>
  )
}
