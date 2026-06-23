import { GROUPS, NAME } from './data.js'

// Normalize a team name so "Côte d'Ivoire", "Cote dIvoire" etc. all compare equal.
const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z]/g, '')

// Extra aliases for teams whose football-data.org name differs from ours.
// (Our display names in NAME are matched automatically; these are the exceptions.)
const ALIAS = {
  KOR: ['korearepublic', 'korea'],
  USA: ['unitedstates'],
  CZE: ['czechrepublic'],
  CIV: ['cotedivoire'],
  CPV: ['caboverde', 'capeverdeislands'],
  COD: ['congodr', 'drcongo', 'democraticrepublicofthecongo'],
  TUR: ['turkey'],
  BIH: ['bosniaandherzegovina', 'bosniaherzegovina'],
  IRN: ['iriran'],
}

// normalized name -> our team code
const NAME_TO_CODE = (() => {
  const map = {}
  for (const code in NAME) map[norm(NAME[code])] = code
  for (const code in ALIAS) for (const a of ALIAS[code]) map[norm(a)] = code
  return map
})()

function codeForName(name) {
  return NAME_TO_CODE[norm(name)] || null
}

// fixture lookup: sorted code pair -> { key, home }
const FIXTURE_INDEX = (() => {
  const idx = {}
  GROUPS.forEach((g) => {
    g.matches.forEach((mt, i) => {
      const pair = [mt.h, mt.a].sort().join('-')
      idx[pair] = { key: g.id + '-' + i, home: mt.h }
    })
  })
  return idx
})()

// Turn the API's match list into a map keyed by our "groupId-idx",
// with scores oriented to our home/away.
export function mapLiveToFixtures(apiMatches) {
  const out = {}
  for (const m of apiMatches || []) {
    const hc = codeForName(m.home)
    const ac = codeForName(m.away)
    if (!hc || !ac) continue
    const entry = FIXTURE_INDEX[[hc, ac].sort().join('-')]
    if (!entry) continue
    const direct = hc === entry.home
    out[entry.key] = {
      status: m.status,
      utcDate: m.utcDate,
      homeScore: direct ? m.homeScore : m.awayScore,
      awayScore: direct ? m.awayScore : m.homeScore,
    }
  }
  return out
}

export const isLiveStatus = (s) => s === 'IN_PLAY' || s === 'PAUSED' || s === 'LIVE'
export const isFinishedStatus = (s) => s === 'FINISHED'
