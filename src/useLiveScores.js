import { useState, useEffect } from 'react'
import { mapLiveToFixtures } from './live.js'

// Polls /api/live and returns a map: { "groupId-idx": { status, homeScore, awayScore } }.
// Fails silently (returns {}) when there's no backend, e.g. plain `npm run dev`.
export function useLiveScores(intervalMs = 45000) {
  const [live, setLive] = useState({})

  useEffect(() => {
    let stopped = false

    const load = async () => {
      try {
        const r = await fetch('/api/live')
        if (!r.ok) return
        const data = await r.json()
        if (!stopped) setLive(mapLiveToFixtures(data.matches))
      } catch {
        /* no live backend available — ignore */
      }
    }

    load()
    const id = setInterval(load, intervalMs)
    return () => {
      stopped = true
      clearInterval(id)
    }
  }, [intervalMs])

  return live
}
