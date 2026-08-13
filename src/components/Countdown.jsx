import React, { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export function Countdown({ target }) {
  const { t } = useLanguage()
  const getDiff = () => Math.max(0, new Date(target).getTime() - Date.now())
  const [diff, setDiff] = useState(getDiff)

  useEffect(() => {
    const timer = setInterval(() => setDiff(getDiff()), 1000)
    return () => clearInterval(timer)
  }, [target])

  const values = useMemo(() => {
    return [
      Math.floor(diff / 86400000),
      Math.floor((diff / 3600000) % 24),
      Math.floor((diff / 60000) % 60),
      Math.floor((diff / 1000) % 60),
    ]
  }, [diff])

  const labels = [t.countdown.days, t.countdown.hours, t.countdown.mins, t.countdown.secs]

  return (
    <div className="countdown-orbit" role="timer" aria-live="polite">
      {values.map((value, index) => (
        <div className="countdown-orbit-item" key={labels[index]} style={{ '--delay': `${index * 0.15}s` }}>
          <div className="countdown-orbit-ring">
            <strong className="wf">{String(value).padStart(2, '0')}</strong>
          </div>
          <span className="countdown-orbit-label">{labels[index]}</span>
        </div>
      ))}
    </div>
  )
}
