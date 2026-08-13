import React from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { Link } from '../components/Layout'
import { SectionTitle } from '../components/SectionTitle'

export function Profiles({ slug }) {
  const { data: siteData } = useSiteData()
  if (slug) {
    const profile = siteData.profiles.find(item => item.slug === slug)
    if (!profile) return <div className="sub-page container"><h1>Profile not found</h1></div>

    return (
      <section className="profile-detail container">
        <Link to="/profiles" className="back-link">← All profiles</Link>
        <div className="profile-detail-grid">
          <div className="profile-detail-image" style={{ background: profile.accent }}><img src={profile.image} alt={profile.name}/></div>
          <div className="profile-detail-copy">
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>Profile</span>
            <h1>{profile.name}</h1>
            <h2>{profile.fullName}</h2>
            <p className="profile-subtitle">{profile.subtitle}</p>
            <p className="profile-bio">{profile.bio}</p>
            <div className="facts-grid">
              {profile.facts.map(fact => (
                <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="sub-page container">
      <SectionTitle>Profile</SectionTitle>
      <div className="profile-grid">
        {siteData.profiles.map(profile => (
          <Link key={profile.slug} to={`/profiles/${profile.slug}`} className="profile-card">
            <div className="profile-image" style={{ background: profile.accent }}><img src={profile.image} alt={profile.name}/></div>
            <div className="profile-info"><h3>{profile.name}</h3><span>View Profile</span></div>
          </Link>
        ))}
      </div>
    </section>
  )
}
