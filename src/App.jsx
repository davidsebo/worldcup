import { useState, useMemo, useCallback } from 'react'
import { NAME, GROUPS, DREAM, POINTS, ORD, TIPS, FLAG, PICKER } from './data.js'
import { computeRows, scoreGroup, initScores } from './standings.js'

const PEOPLE = ['Singer', 'Kyle', 'Spencer', 'Sebo']
const PERSON_MAX = {}
GROUPS.forEach((g) => {
  const o = PICKER[g.id]
  PERSON_MAX[o] = (PERSON_MAX[o] || 0) + 7
})

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

function Fixture({ group, idx, mt, scores, setScore, toggleActive }) {
  const key = group.id + '-' + idx
  const s = scores[key]
  const hs = s ? s.hs : mt.hs
  const as = s ? s.as : mt.as
  const active = mt.played || (s ? !!s.active : false)
  const cls = mt.played
    ? 'played'
    : !active
    ? 'inactive'
    : hs > as
    ? 'win-h'
    : hs < as
    ? 'win-a'
    : ''
  return (
    <div
      className={'fx ' + cls}
      onClick={mt.played ? undefined : () => toggleActive(key)}
      title={mt.played ? undefined : active ? 'Click to exclude this result' : 'Click to include this result'}
    >
      <span className="side home">
        <Flag code={mt.h} />
        <span className="tname">{NAME[mt.h]}</span>
      </span>
      {mt.played ? (
        <span className="played-score">
          {hs}
          <span style={{ color: 'var(--chalk)' }}>–</span>
          {as} <span className="ft">FT</span>
        </span>
      ) : (
        <span className="score" onClick={active ? (e) => e.stopPropagation() : undefined}>
          <Stepper value={hs} onChange={(v) => setScore(key, v, as)} />
          <span className="dash">–</span>
          <Stepper value={as} onChange={(v) => setScore(key, hs, v)} />
        </span>
      )}
      <span className="side away">
        <span className="tname">{NAME[mt.a]}</span>
        <Flag code={mt.a} />
      </span>
    </div>
  )
}

function GroupCard({ group, scores, setScore, toggleActive }) {
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

  const total = useMemo(() => {
    let t = 0
    GROUPS.forEach((g) => {
      t += scoreGroup(g, computeRows(g, scores))
    })
    return t
  }, [scores])

  const perPerson = useMemo(() => {
    const t = {}
    GROUPS.forEach((g) => {
      const o = PICKER[g.id]
      t[o] = (t[o] || 0) + scoreGroup(g, computeRows(g, scores))
    })
    return t
  }, [scores])
  const lead = useMemo(() => Math.max(...PEOPLE.map((p) => perPerson[p] || 0)), [perPerson])

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="eyebrow">World Cup 2026 · Pool Room</span>
            <h1>Final Standings Scenario Simulator</h1>
          </div>
          <div className="scorebug">
            <div className="bug total">
              <span className="num">
                {total}
                <span className="denom"> /84</span>
              </span>
              <span className="lbl">Your score</span>
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
            scores={scores}
            setScore={setScore}
            toggleActive={toggleActive}
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
