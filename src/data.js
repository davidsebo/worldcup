// ============================================================
// DATA — current as of group-stage matchday 2 (June 22, 2026)
// Each group: teams, all six round-robin matches (played ones
// carry final scores; remaining ones default to 0-0 and are
// editable), and the user's predicted 1-2-3-4 finish.
// ============================================================

export const NAME = {
  MEX: 'Mexico', KOR: 'South Korea', CZE: 'Czechia', RSA: 'South Africa',
  CAN: 'Canada', SUI: 'Switzerland', BIH: 'Bosnia', QAT: 'Qatar',
  BRA: 'Brazil', MAR: 'Morocco', SCO: 'Scotland', HTI: 'Haiti',
  USA: 'USA', AUS: 'Australia', PAR: 'Paraguay', TUR: 'Türkiye',
  GER: 'Germany', CIV: 'Ivory Coast', ECU: 'Ecuador', CUW: 'Curaçao',
  NED: 'Netherlands', JPN: 'Japan', SWE: 'Sweden', TUN: 'Tunisia',
  EGY: 'Egypt', IRN: 'Iran', BEL: 'Belgium', NZL: 'New Zealand',
  ESP: 'Spain', URU: 'Uruguay', CPV: 'Cape Verde', KSA: 'Saudi Arabia',
  FRA: 'France', NOR: 'Norway', SEN: 'Senegal', IRQ: 'Iraq',
  ARG: 'Argentina', AUT: 'Austria', DZA: 'Algeria', JOR: 'Jordan',
  COL: 'Colombia', COD: 'DR Congo', POR: 'Portugal', UZB: 'Uzbekistan',
  ENG: 'England', GHA: 'Ghana', PAN: 'Panama', CRO: 'Croatia',
}

// m(home, away, homeScore, awayScore, played)
const m = (h, a, hs, as, played) => ({ h, a, hs, as, played })

export const GROUPS = [
  { id: 'A', picks: ['MEX', 'KOR', 'CZE', 'RSA'], matches: [
    m('MEX', 'RSA', 2, 0, true), m('KOR', 'CZE', 2, 1, true),
    m('CZE', 'RSA', 1, 1, true), m('MEX', 'KOR', 1, 0, true),
    m('CZE', 'MEX', 0, 0, false), m('RSA', 'KOR', 0, 0, false)] },
  { id: 'B', picks: ['SUI', 'CAN', 'QAT', 'BIH'], matches: [
    m('CAN', 'BIH', 1, 1, true), m('SUI', 'QAT', 1, 1, true),
    m('SUI', 'BIH', 4, 1, true), m('CAN', 'QAT', 6, 0, true),
    m('SUI', 'CAN', 0, 0, false), m('BIH', 'QAT', 0, 0, false)] },
  { id: 'C', picks: ['BRA', 'MAR', 'SCO', 'HTI'], matches: [
    m('BRA', 'MAR', 1, 1, true), m('SCO', 'HTI', 1, 0, true),
    m('SCO', 'MAR', 0, 1, true), m('BRA', 'HTI', 3, 0, true),
    m('SCO', 'BRA', 0, 0, false), m('MAR', 'HTI', 0, 0, false)] },
  { id: 'D', picks: ['USA', 'TUR', 'PAR', 'AUS'], matches: [
    m('USA', 'PAR', 4, 1, true), m('AUS', 'TUR', 2, 0, true),
    m('USA', 'AUS', 2, 0, true), m('TUR', 'PAR', 0, 1, true),
    m('TUR', 'USA', 0, 0, false), m('PAR', 'AUS', 0, 0, false)] },
  { id: 'E', picks: ['ECU', 'GER', 'CIV', 'CUW'], matches: [
    m('GER', 'CUW', 7, 1, true), m('CIV', 'ECU', 1, 0, true),
    m('GER', 'CIV', 2, 1, true), m('ECU', 'CUW', 0, 0, true),
    m('GER', 'ECU', 0, 0, false), m('CIV', 'CUW', 0, 0, false)] },
  { id: 'F', picks: ['NED', 'SWE', 'JPN', 'TUN'], matches: [
    m('NED', 'JPN', 2, 2, true), m('SWE', 'TUN', 5, 1, true),
    m('NED', 'SWE', 5, 1, true), m('TUN', 'JPN', 0, 4, true),
    m('NED', 'TUN', 0, 0, false), m('JPN', 'SWE', 0, 0, false)] },
  { id: 'G', picks: ['BEL', 'EGY', 'NZL', 'IRN'], matches: [
    m('BEL', 'EGY', 1, 1, true), m('IRN', 'NZL', 2, 2, true),
    m('BEL', 'IRN', 0, 0, true), m('EGY', 'NZL', 3, 1, true),
    m('EGY', 'IRN', 0, 0, false), m('NZL', 'BEL', 0, 0, false)] },
  { id: 'H', picks: ['ESP', 'URU', 'KSA', 'CPV'], matches: [
    m('ESP', 'CPV', 0, 0, true), m('KSA', 'URU', 1, 1, true),
    m('ESP', 'KSA', 4, 0, true), m('URU', 'CPV', 2, 2, true),
    m('CPV', 'KSA', 0, 0, false), m('URU', 'ESP', 0, 0, false)] },
  { id: 'I', picks: ['FRA', 'NOR', 'SEN', 'IRQ'], matches: [
    m('FRA', 'SEN', 3, 1, true), m('NOR', 'IRQ', 4, 1, true),
    m('FRA', 'IRQ', 3, 0, true), m('NOR', 'SEN', 3, 2, true),
    m('NOR', 'FRA', 0, 0, false), m('SEN', 'IRQ', 0, 0, false)] },
  { id: 'J', picks: ['ARG', 'AUT', 'DZA', 'JOR'], matches: [
    m('ARG', 'DZA', 3, 0, true), m('AUT', 'JOR', 3, 1, true),
    m('ARG', 'AUT', 2, 0, true), m('JOR', 'DZA', 1, 2, true),
    m('ARG', 'JOR', 0, 0, false), m('AUT', 'DZA', 0, 0, false)] },
  { id: 'K', picks: ['POR', 'COL', 'UZB', 'COD'], matches: [
    m('COL', 'UZB', 1, 0, true), m('POR', 'COD', 0, 0, true),
    m('POR', 'UZB', 0, 0, false), m('COL', 'COD', 0, 0, false),
    m('COL', 'POR', 0, 0, false), m('COD', 'UZB', 0, 0, false)] },
  { id: 'L', picks: ['ENG', 'CRO', 'GHA', 'PAN'], matches: [
    m('ENG', 'CRO', 4, 2, true), m('GHA', 'PAN', 1, 0, true),
    m('ENG', 'GHA', 0, 0, false), m('PAN', 'CRO', 0, 0, false),
    m('ENG', 'PAN', 0, 0, false), m('GHA', 'CRO', 0, 0, false)] },
]

// "Root-for ceiling" — the best realistic outcome per the analysis.
// keyed by "groupId-matchIndex" -> [homeScore, awayScore]
export const DREAM = {
  'A-4': [0, 1], 'A-5': [0, 1],
  'B-4': [1, 0], 'B-5': [0, 1],
  'C-4': [0, 1], 'C-5': [1, 0],
  'D-4': [0, 1], 'D-5': [0, 1],
  'E-4': [1, 3], 'E-5': [0, 0],
  'F-4': [2, 0], 'F-5': [0, 1],
  'G-4': [1, 1], 'G-5': [0, 3],
  'H-4': [1, 1], 'H-5': [1, 1],
  'I-4': [0, 1], 'I-5': [1, 0],
  'J-4': [2, 0], 'J-5': [1, 0],
  'K-2': [2, 0], 'K-3': [1, 0], 'K-4': [0, 1], 'K-5': [0, 1],
  'L-2': [1, 0], 'L-3': [0, 1], 'L-4': [1, 0], 'L-5': [0, 1],
}

export const POINTS = [3, 2, 1, 1] // 1st, 2nd, 3rd, 4th
export const ORD = ['1st', '2nd', '3rd', '4th']
