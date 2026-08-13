import React, { useEffect, useState } from 'react'
import { Link } from './Layout'

export function HeroSlider({ banners }) {
  const [index, setIndex] = useState(0)
  const items = banners?.length ? banners : []

  useEffect(() => {
    if (items.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setIndex(current => (current + 1) % items.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [items.length])

  if (!items.length) return null

  return (
    <div className="hero-slider">
      <div className="hero-slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((banner, bannerIndex) => {
          const content = (
            <img src={banner.image} alt={banner.alt || ''} />
          )

          return (
            <div className="hero-slider-item" key={`${banner.image}-${bannerIndex}`}>
              {banner.url?.startsWith('http') ? (
                <a href={banner.url} target="_blank" rel="noreferrer">{content}</a>
              ) : banner.url ? (
                <Link to={banner.url}>{content}</Link>
              ) : content}
            </div>
          )
        })}
      </div>

      {items.length > 1 && (
        <div className="hero-slider-dots">
          {items.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={dotIndex === index ? 'active' : ''}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
