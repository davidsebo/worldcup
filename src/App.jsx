import { useState, useMemo, useCallback } from 'react'
import { NAME, GROUPS, DREAM, POINTS, ORD, TIPS, FLAG, PICKER } from './data.js'
import { computeRows, scoreGroup, initScores } from './standings.js'
import { useLiveScores } from './useLiveScores.js'
import { isLiveStatus, isFinishedStatus } from './live.js'

const PEOPLE = ['Singer', 'Kyle', 'Spencer', 'Sebo']
const PERSON_MAX = {}
GROUPS.forEach((g) => {
  const o = PICKER[g.id]
  PERSON_MAX[o] = (PERSON_MAX[o] || 0) + 7
})

// Games hardcoded as played in data.js stay authoritative (never overwritten by the live feed).
const PLAYED_KEYS = new Set()
GROUPS.forEach((g) =>
  g.matches.forEach((mt, i) => {
    if (mt.played) PLAYED_KEYS.add(g.id + '-' + i)
  }),
)

const fmtWhen = (iso) => {
  if (!iso) return null
  const d = new Date(iso)
  if (isNaN(d.getTime())) return null
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Flag({ code }) {
  const slug = FLAG[code]
  if (!slug) return null
  return (
    <img
      className="flag"
      src={`https://flagcdn.com/${slug}.svg`}
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  )
}

function Stepper({ value, onChange }) {
  return (
    <span className="stepper">
      <button onClick={() => onChange(Math.max(0, value - 1))} aria-label="minus">
        –
      </button>
      <span className="v">{value}</span>
      <button onClick={() => onChange(Math.min(19, value + 1))} aria-label="plus">
        +
      </button>
    </span>
  )
}

function Fixture({ group, idx, mt, scores, setScore, toggleActive, live, editing, onToggleLiveEdit }) {
  const key = group.id + '-' + idx
  const s = scores[key]
  const hs = s ? s.hs : mt.hs
  const as = s ? s.as : mt.as

  const status = live && live.status
  const liveNow = isLiveStatus(status)
  const finished = mt.played || isFinishedStatus(status)
  const when = live && fmtWhen(live.utcDate)

  const home = (
    <span className="side home">
      <Flag code={mt.h} />
      <span className="tname">{NAME[mt.h]}</span>
    </span>
  )
  const away = (
    <span className="side away">
      <span className="tname">{NAME[mt.a]}</span>
      <Flag code={mt.a} />
    </span>
  )

  // Final result — a hardcoded played game, or a live game that has ended.
  if (finished) {
    return (
      <div className="fx played">
        {home}
        <span className="played-score">
          {hs}
          <span style={{ color: 'var(--chalk)' }}>–</span>
          {as} <span className="ft">FT</span>
        </span>
        {away}
      </div>
    )
  }

  // In-play — LIVE by default (read-only), toggle to EDIT to play a hypothetical.
  if (liveNow) {
    const cls = hs > as ? 'win-h' : hs < as ? 'win-a' : ''
    return (
      <div className={'fx ' + cls}>
        {when && <span className="fx-when">{when}</span>}
        {home}
        <span className="score-wrap">
          <button
            className={'live-switch' + (editing ? ' on-edit' : ' on-live')}
            onClick={() => onToggleLiveEdit(key)}
            title={
              editing
                ? 'Showing your edit — click for the live score'
                : 'Live score — click to edit a hypothetical'
            }
          >
            <span className="live-knob" />
            <span className="seg live">
              <span className="live-dot" />
              LIVE
            </span>
            <span className="seg edit">EDIT</span>
          </button>
          {editing ? (
            <span className="score">
              <Stepper value={hs} onChange={(v) => setScore(key, v, as)} />
              <span className="dash">–</span>
              <Stepper value={as} onChange={(v) => setScore(key, hs, v)} />
            </span>
          ) : (
            <span className="played-score">
              {hs}
              <span style={{ color: 'var(--chalk)' }}>–</span>
              {as}
            </span>
          )}
        </span>
        {away}
      </div>
    )
  }

  // Not started — click-to-include behavior.
  const active = s ? !!s.active : false
  const cls = !active ? 'inactive' : hs > as ? 'win-h' : hs < as ? 'win-a' : ''
  return (
    <div
      className={'fx ' + cls}
      onClick={() => toggleActive(key)}
      title={active ? 'Click to exclude this result' : 'Click to include this result'}
    >
      {when && <span className="fx-when">{when}</span>}
      {home}
      <span className="score" onClick={active ? (e) => e.stopPropagation() : undefined}>
        <Stepper value={hs} onChange={(v) => setScore(key, v, as)} />
        <span className="dash">–</span>
        <Stepper value={as} onChange={(v) => setScore(key, hs, v)} />
      </span>
      {away}
    </div>
  )
}

function GroupCard({ group, scores, setScore, toggleActive, live, editKeys, toggleLiveEdit }) {
  const rows = useMemo(() => computeRows(group, scores), [group, scores])
  const gp = scoreGroup(group, rows)
  const remaining = group.matches.filter((x) => !x.played).length
  const allPlayed = remaining === 0
  const [showTip, setShowTip] = useState(false)
  const tip = TIPS[group.id]
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="gid">
            Group <b>{group.id}</b>
            {tip && (
              <span className="tip-wrap">
                <button
                  className="tip-btn"
                  aria-label="Strategy for this group"
                  aria-expanded={showTip}
                  onClick={() => setShowTip((v) => !v)}
                >
                  ?
                </button>
                {showTip && (
                  <span
                    className="tip-backdrop"
                    onClick={() => setShowTip(false)}
                  />
                )}
                {showTip && (
                  <span className="tip-pop" role="dialog">
                    <span className="tip-tag">{tip.tagline}</span>
                    {tip.bullets.map((b, i) => (
                      <span className="tip-row" key={i}>
                        <b>{b.label}:</b> {b.text}
                      </span>
                    ))}
                  </span>
                )}
              </span>
            )}
          </div>
          <div className="status">
            {allPlayed ? 'final' : remaining + ' game' + (remaining > 1 ? 's' : '') + ' left'}
          </div>
        </div>
        <div className="grp-pts">
          {gp}
          <span className="of"> / 7</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="l" style={{ width: '30px' }}>
              #
            </th>
            <th className="l">Team</th>
            <th>Pl</th>
            <th>GD</th>
            <th>Pts</th>
            <th>You</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => {
            const correct = group.picks[idx] === r.code
            const predIdx = group.picks.indexOf(r.code)
            return (
              <tr key={r.code} className={correct ? 'correct' : 'wrong'}>
                <td className="l">
                  <span className="rank">{idx + 1}</span>
                </td>
                <td className="team">
                  <div className="tname">
                    <Flag code={r.code} />
                    {NAME[r.code]}
                  </div>
                  <div className="pick-note">
                    {PICKER[group.id] || 'Your'}'s pick: {predIdx >= 0 ? ORD[predIdx] : '—'}
                  </div>
                </td>
                <td>{r.P}</td>
                <td className={r.GD > 0 ? 'gd-pos' : r.GD < 0 ? 'gd-neg' : ''}>
                  {r.GD > 0 ? '+' : ''}
                  {r.GD}
                </td>
                <td className="col-pts">{r.Pts}</td>
                <td>
                  <span className={'ptspill' + (correct ? '' : ' zero')}>
                    {correct ? '+' + POINTS[idx] : '–'}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="fixtures">
        <div className="fx-h">{allPlayed ? 'Results' : 'Remaining — click a game to include it'}</div>
        {group.matches.map(
          (mt, idx) =>
            !mt.played && (
              <Fixture
                key={idx}
                group={group}
                idx={idx}
                mt={mt}
                scores={scores}
                setScore={setScore}
                toggleActive={toggleActive}
                live={live[group.id + '-' + idx]}
                editing={editKeys.has(group.id + '-' + idx)}
                onToggleLiveEdit={toggleLiveEdit}
              />
            ),
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [scores, setScores] = useState(() => initScores(null))
  const setScore = useCallback(
    (key, hs, as) => setScores((p) => ({ ...p, [key]: { ...p[key], hs, as, active: true } })),
    [],
  )
  const toggleActive = useCallback(
    (key) => setScores((p) => ({ ...p, [key]: { ...p[key], active: !p[key].active } })),
    [],
  )

  const live = useLiveScores()
  // keys the user flipped from LIVE to EDIT (so they can play out a hypothetical)
  const [editKeys, setEditKeys] = useState(() => new Set())

  // Overlay live data on top of the manual scores:
  // finished games lock to their result; in-play games show the live score
  // unless the user toggled that game into EDIT mode.
  const effectiveScores = useMemo(() => {
    const out = { ...scores }
    for (const key in live) {
      if (PLAYED_KEYS.has(key)) continue // trust hardcoded results
      const L = live[key]
      if (isFinishedStatus(L.status)) {
        out[key] = { hs: L.homeScore, as: L.awayScore, active: true }
      } else if (isLiveStatus(L.status) && !editKeys.has(key)) {
        out[key] = { hs: L.homeScore, as: L.awayScore, active: true }
      }
    }
    return out
  }, [scores, live, editKeys])

  const toggleLiveEdit = useCallback(
    (key) => {
      setEditKeys((prev) => {
        const next = new Set(prev)
        if (next.has(key)) {
          next.delete(key) // back to LIVE
        } else {
          next.add(key) // into EDIT — seed steppers from the current live score
          const L = live[key]
          if (L) setScore(key, L.homeScore, L.awayScore)
        }
        return next
      })
    },
    [live, setScore],
  )

  const total = useMemo(() => {
    let t = 0
    GROUPS.forEach((g) => {
      t += scoreGroup(g, computeRows(g, effectiveScores))
    })
    return t
  }, [effectiveScores])

  const perPerson = useMemo(() => {
    const t = {}
    GROUPS.forEach((g) => {
      const o = PICKER[g.id]
      t[o] = (t[o] || 0) + scoreGroup(g, computeRows(g, effectiveScores))
    })
    return t
  }, [effectiveScores])
  const lead = useMemo(() => Math.max(...PEOPLE.map((p) => perPerson[p] || 0)), [perPerson])

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="eyebrow">World Cup 2026 · Pool Room</span>
            <h1>Final Standings Scenarios</h1>
          </div>
          <div className="scorebug">
            <div className="bug total">
              <span className="lbl">Your score</span>
              <span className="num">
                {total}
                <span className="denom"> /84</span>
              </span>
            </div>
          </div>
        </div>
        <div className="topbar-inner" style={{ marginTop: 0 }}>
          <div className="presets">
            <button className="btn primary" onClick={() => setScores(initScores(DREAM))}>
              What to root for
            </button>
            <button className="btn ghost" onClick={() => setScores(initScores(null))}>
              Reset all games
            </button>
          </div>
        </div>

        <div className="standings-bar">
        <div className="leaderboard">
          {PEOPLE.map((p) => {
            const pts = perPerson[p] || 0
            const leading = pts > 0 && pts === lead
            return (
              <div className={'lb-card' + (leading ? ' leading' : '')} key={p}>
                <span className="lb-name">{p}</span>
                <span className="lb-pts">
                  {pts}
                  <span className="lb-max"> / {PERSON_MAX[p]}</span>
                </span>
              </div>
            )
          })}
        </div>
        <div className="legend">
          <span className="swatch">
            <span className="dot" style={{ background: 'var(--green)' }}></span>Correct
          </span>
          <span className="swatch">
            <span className="dot" style={{ background: 'var(--red)' }}></span>Miss
          </span>
        </div>
        </div>
      </div>

      <div className="grid">
        {GROUPS.map((g) => (
          <GroupCard
            key={g.id}
            group={g}
            scores={effectiveScores}
            setScore={setScore}
            toggleActive={toggleActive}
            live={live}
            editKeys={editKeys}
            toggleLiveEdit={toggleLiveEdit}
          />
        ))}
      </div>

      <div className="footnote">
        Starting data current through Matchday 2 (June 22, 2026). Scoring: 1st = 3 · 2nd = 2 · 3rd =
        1 · 4th = 1 · max 84.
      </div>
    </>
  )
}
