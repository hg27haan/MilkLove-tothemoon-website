import React, { useRef } from 'react'

export function MovieCarousel({ movies }) {
  const trackRef = useRef(null)

  const scroll = direction => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * 320, behavior: 'smooth' })
  }

  return (
    <div className="movie-carousel">
      <button className="movie-carousel-btn prev" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
      <div className="movie-carousel-track" ref={trackRef}>
        {movies.map(movie => (
          <div className="movie-item" key={movie.id}>
            <a href={movie.url} target="_blank" rel="noreferrer">
              <img src={movie.thumbnail} alt={movie.title} />
              <div className="movie-item-title">{movie.title}</div>
            </a>
          </div>
        ))}
      </div>
      <button className="movie-carousel-btn next" onClick={() => scroll(1)} aria-label="Next">›</button>
    </div>
  )
}
