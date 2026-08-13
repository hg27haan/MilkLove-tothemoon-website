import React from 'react'

export function SectionTitle({ children, subtitle }) {
  return (
    <div className="section-head">
      <h2 className="section-title wf">
        <span className="section-title-text">{children}</span>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-title-deco" aria-hidden="true">
        <span />
        <span className="section-title-dot" />
        <span />
      </div>
    </div>
  )
}
