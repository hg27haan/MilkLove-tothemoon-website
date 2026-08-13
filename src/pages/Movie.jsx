import React from 'react'
import { useSiteData } from '../data/SiteDataContext'
import { SectionTitle } from '../components/SectionTitle'

export function Movie() {
  const { data: siteData } = useSiteData()

  return (
    <div className="sub-page movie-page">
      <div className="container">
        <SectionTitle>Movie</SectionTitle>
        <div className="movie-grid">
          {siteData.movies.map(movie => (
            <div className="movie-item" key={movie.id}>
              <a href={movie.url} target="_blank" rel="noreferrer">
                <img src={movie.thumbnail} alt={movie.title} />
                <div className="movie-item-title">{movie.title}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
