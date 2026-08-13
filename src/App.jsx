import React, { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Profiles } from './pages/Profiles'
import { Works } from './pages/Works'
import { Schedule } from './pages/Schedule'
import { Stats } from './pages/Stats'
import { Guide } from './pages/Guide'
import { Game } from './pages/Game'
import { News } from './pages/News'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { Movie } from './pages/Movie'
import { Admin } from './pages/Admin'

function usePath() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const update = () => { setPath(window.location.pathname); window.scrollTo(0, 0) }
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])
  return path
}

export default function App() {
  const path = usePath()
  if (path === '/admin') return <Admin />
  let page = <Home />

  if (path === '/profiles') page = <Profiles />
  else if (path.startsWith('/profiles/')) page = <Profiles slug={path.split('/')[2]} />
  else if (path === '/works') page = <Works />
  else if (path === '/schedule') page = <Schedule />
  else if (path === '/stats') page = <Stats />
  else if (path === '/guide') page = <Guide />
  else if (path === '/game') page = <Game />
  else if (path === '/news') page = <News />
  else if (path === '/project') page = <Projects />
  else if (path.startsWith('/project/')) page = <ProjectDetail slug={path.split('/')[2]} />
  else if (path === '/movie') page = <Movie />

  return <Layout>{page}</Layout>
}
