import { GROUPS, POINTS } from './data.js'

// Compute the final table for a group given a score map.
// Tiebreakers (FIFA order): points -> goal difference -> goals scored
// -> head-to-head (points, GD, goals among the tied teams).
export function computeRows(group, scores) {
  const stat = {}
  group.matches.forEach((mt, i) => {
    ;[mt.h, mt.a].forEach((c) => {
      if (!stat[c]) stat[c] = { code: c, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, Pts: 0 }
    })
    const s = scores[group.id + '-' + i]
    const hs = s ? s.hs : mt.hs
    const as = s ? s.as : mt.as
    const H = stat[mt.h]
    const A = stat[mt.a]
    H.P++; A.P++
    H.GF += hs; H.GA += as
    A.GF += as; A.GA += hs
    if (hs > as) { H.W++; A.L++; H.Pts += 3 }
    else if (hs < as) { A.W++; H.L++; A.Pts += 3 }
    else { H.D++; A.D++; H.Pts++; A.Pts++ }
  })
  let rows = Object.values(stat).map((r) => ({ ...r, GD: r.GF - r.GA }))

  // head-to-head mini stats among a set of codes
  const h2h = (codes) => {
    const set = new Set(codes)
    const mini = {}
    codes.forEach((c) => (mini[c] = { Pts: 0, GD: 0, GF: 0 }))
    group.matches.forEach((mt, i) => {
      if (!set.has(mt.h) || !set.has(mt.a)) return
      const s = scores[group.id + '-' + i]
      const hs = s ? s.hs : mt.hs
      const as = s ? s.as : mt.as
      mini[mt.h].GF += hs; mini[mt.a].GF += as
      mini[mt.h].GD += hs - as; mini[mt.a].GD += as - hs
      if (hs > as) mini[mt.h].Pts += 3
      else if (hs < as) mini[mt.a].Pts += 3
      else { mini[mt.h].Pts++; mini[mt.a].Pts++ }
    })
    return mini
  }

  rows.sort((a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF || a.code.localeCompare(b.code))

  // resolve runs tied on Pts+GD+GF via head-to-head
  let i = 0
  while (i < rows.length) {
    let j = i + 1
    while (
      j < rows.length &&
      rows[j].Pts === rows[i].Pts &&
      rows[j].GD === rows[i].GD &&
      rows[j].GF === rows[i].GF
    )
      j++
    if (j - i > 1) {
      const slice = rows.slice(i, j)
      const mini = h2h(slice.map((r) => r.code))
      slice.sort((a, b) => {
        const A = mini[a.code]
        const B = mini[b.code]
        return B.Pts - A.Pts || B.GD - A.GD || B.GF - A.GF || a.code.localeCompare(b.code)
      })
      rows.splice(i, slice.length, ...slice)
    }
    i = j
  }
  return rows
}

// Points scored for one group: 3/2/1/1 when a pick lands the exact slot.
export function scoreGroup(group, rows) {
  let pts = 0
  rows.forEach((r, idx) => {
    if (group.picks[idx] === r.code) pts += POINTS[idx]
  })
  return pts
}

// Build the initial score map. `transform` (e.g. DREAM) presets remaining games.
export function initScores(transform) {
  const s = {}
  GROUPS.forEach((g) =>
    g.matches.forEach((mt, i) => {
      const key = g.id + '-' + i
      if (mt.played) {
        s[key] = { hs: mt.hs, as: mt.as }
      } else {
        const d = transform && transform[key]
        s[key] = { hs: d ? d[0] : 0, as: d ? d[1] : 0 }
      }
    }),
  )
  return s
}
