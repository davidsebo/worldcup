import { useState, useEffect } from 'react'
import { mapLiveToFixtures } from './live.js'

// Polls /api/live and returns a map: { "groupId-idx": { status, homeScore, awayScore } }.
// Fails silently (returns {}) when there's no backend, e.g. plain `npm run dev`.
export function useLiveScores(intervalMs = 60000) {
  const [live, setLive] = useState({})

  useEffect(() => {
    let stopped = false

    const load = async () => {
      try {
        const r = await fetch('/api/live')
        if (!r.ok) return
        const data = await r.json()
        // On any error or empty payload (e.g. a transient rate-limit), keep the
        // last good data rather than blanking out the live indicators.
        if (data.error || !Array.isArray(data.matches) || data.matches.length === 0) return
        if (!stopped) setLive(mapLiveToFixtures(data.matches))
      } catch {
        /* no live backend available — ignore, keep last good */
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
