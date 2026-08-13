import React, { useEffect, useState } from 'react'

export function Game() {
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(15)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing || time <= 0) return
    const timer = setInterval(() => setTime(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [playing, time])

  useEffect(() => { if (time === 0) setPlaying(false) }, [time])

  const start = () => { setScore(0); setTime(15); setPlaying(true) }

  return (
    <section className="simple-page page-width game-page">
      <div className="page-title"><span>Mini game</span><h1>MilkLove Runner</h1></div>
      <div className="game-card">
        <div className="game-top"><span>Score <b>{score}</b></span><span>Time <b>{time}</b></span></div>
        <button className="heart-target" disabled={!playing} onClick={() => setScore(s => s + 1)}>♥</button>
        <p>{playing ? 'Tap the heart as fast as you can.' : time === 0 ? `Finished! Score: ${score}` : 'A tiny editable demo game.'}</p>
        <button className="primary-button" onClick={start}>{playing ? 'Restart' : 'Start Game'}</button>
      </div>
    </section>
  )
}
