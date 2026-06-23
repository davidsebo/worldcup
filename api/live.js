// Vercel serverless function — proxies football-data.org so the API token
// stays server-side and we avoid the browser CORS block.
//
// Set FOOTBALL_DATA_TOKEN in your Vercel project's Environment Variables.
// Free tier: https://www.football-data.org/client/register
//
// Returns: { matches: [{ home, away, homeScore, awayScore, status, utcDate }] }
// status is football-data's value: SCHEDULED | TIMED | IN_PLAY | PAUSED | FINISHED | ...

const COMPETITION = 'WC' // FIFA World Cup

export default async function handler(req, res) {
  const token = process.env.FOOTBALL_DATA_TOKEN
  if (!token) {
    res.status(200).json({ matches: [], error: 'missing-token' })
    return
  }

  try {
    const upstream = await fetch(
      `https://api.football-data.org/v4/competitions/${COMPETITION}/matches`,
      { headers: { 'X-Auth-Token': token } },
    )

    if (!upstream.ok) {
      res.status(200).json({ matches: [], error: 'upstream-' + upstream.status })
      return
    }

    const data = await upstream.json()
    const matches = (data.matches || []).map((m) => ({
      home: m.homeTeam?.name || '',
      away: m.awayTeam?.name || '',
      homeScore: m.score?.fullTime?.home ?? 0,
      awayScore: m.score?.fullTime?.away ?? 0,
      status: m.status,
      utcDate: m.utcDate,
    }))

    // Cache at Vercel's edge so many visitors don't burn the rate limit.
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
    res.status(200).json({ matches })
  } catch (e) {
    res.status(200).json({ matches: [], error: 'fetch-failed' })
  }
}
