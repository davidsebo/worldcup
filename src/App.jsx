import { useState, useMemo, useCallback } from 'react'
import { NAME, GROUPS, DREAM, POINTS, ORD } from './data.js'
import { computeRows, scoreGroup, initScores } from './standings.js'

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

function Fixture({ group, idx, mt, scores, setScore }) {
  const key = group.id + '-' + idx
  const s = scores[key]
  const hs = s ? s.hs : mt.hs
  const as = s ? s.as : mt.as
  const cls = mt.played ? 'played' : hs > as ? 'win-h' : hs < as ? 'win-a' : ''
  return (
    <div className={'fx ' + cls}>
      <span className="side home">
        <span className="tname">{NAME[mt.h]}</span>
      </span>
      {mt.played ? (
        <span className="played-score">
          {hs}
          <span style={{ color: 'var(--chalk)' }}>–</span>
          {as} <span className="ft">FT</span>
        </span>
      ) : (
        <span className="score">
          <Stepper value={hs} onChange={(v) => setScore(key, v, as)} />
          <span className="dash">–</span>
          <Stepper value={as} onChange={(v) => setScore(key, hs, v)} />
        </span>
      )}
      <span className="side away">
        <span className="tname">{NAME[mt.a]}</span>
      </span>
    </div>
  )
}

function GroupCard({ group, scores, setScore }) {
  const rows = useMemo(() => computeRows(group, scores), [group, scores])
  const gp = scoreGroup(group, rows)
  const remaining = group.matches.filter((x) => !x.played).length
  const allPlayed = remaining === 0
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="gid">
            Group <b>{group.id}</b>
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
                  <div className="tname">{NAME[r.code]}</div>
                  <div className="pick-note">
                    your pick: {predIdx >= 0 ? ORD[predIdx] : '—'}
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
        <div className="fx-h">{allPlayed ? 'Results' : 'Remaining — set the scores'}</div>
        {group.matches.map(
          (mt, idx) =>
            !mt.played && (
              <Fixture key={idx} group={group} idx={idx} mt={mt} scores={scores} setScore={setScore} />
            ),
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [scores, setScores] = useState(() => initScores(null))
  const setScore = useCallback(
    (key, hs, as) => setScores((p) => ({ ...p, [key]: { hs, as } })),
    [],
  )

  const total = useMemo(() => {
    let t = 0
    GROUPS.forEach((g) => {
      t += scoreGroup(g, computeRows(g, scores))
    })
    return t
  }, [scores])

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="eyebrow">World Cup 2026 · Pool Room</span>
            <h1>Final-Standings Scenario Simulator</h1>
            <span className="sub">
              Set every remaining result and watch your picks score. Tiebreakers: points → goal
              difference → goals → head-to-head.
            </span>
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
              Load root-for ceiling
            </button>
            <button className="btn ghost" onClick={() => setScores(initScores(null))}>
              Reset remaining to 0–0
            </button>
          </div>
          <div className="legend" style={{ marginLeft: 'auto' }}>
            <span className="swatch">
              <span className="dot" style={{ background: 'var(--green)' }}></span>pick lands the slot
              (+pts)
            </span>
            <span className="swatch">
              <span className="dot" style={{ background: 'var(--red)' }}></span>miss
            </span>
          </div>
        </div>
      </div>

      <div className="grid">
        {GROUPS.map((g) => (
          <GroupCard key={g.id} group={g} scores={scores} setScore={setScore} />
        ))}
      </div>

      <div className="footnote">
        Starting data current through Matchday 2 (June 22, 2026). Scoring: 1st = 3 · 2nd = 2 · 3rd =
        1 · 4th = 1 · max 84.
      </div>
    </>
  )
}
