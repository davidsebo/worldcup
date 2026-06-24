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

// flagcdn slug per team code (ISO 3166-1 alpha-2; subdivisions for ENG/SCO)
export const FLAG = {
  MEX: 'mx', KOR: 'kr', CZE: 'cz', RSA: 'za',
  CAN: 'ca', SUI: 'ch', BIH: 'ba', QAT: 'qa',
  BRA: 'br', MAR: 'ma', SCO: 'gb-sct', HTI: 'ht',
  USA: 'us', AUS: 'au', PAR: 'py', TUR: 'tr',
  GER: 'de', CIV: 'ci', ECU: 'ec', CUW: 'cw',
  NED: 'nl', JPN: 'jp', SWE: 'se', TUN: 'tn',
  EGY: 'eg', IRN: 'ir', BEL: 'be', NZL: 'nz',
  ESP: 'es', URU: 'uy', CPV: 'cv', KSA: 'sa',
  FRA: 'fr', NOR: 'no', SEN: 'sn', IRQ: 'iq',
  ARG: 'ar', AUT: 'at', DZA: 'dz', JOR: 'jo',
  COL: 'co', COD: 'cd', POR: 'pt', UZB: 'uz',
  ENG: 'gb-eng', GHA: 'gh', PAN: 'pa', CRO: 'hr',
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
    m('POR', 'UZB', 5, 0, true), m('COL', 'COD', 1, 0, true),
    m('COL', 'POR', 0, 0, false), m('COD', 'UZB', 0, 0, false)] },
  { id: 'L', picks: ['ENG', 'CRO', 'GHA', 'PAN'], matches: [
    m('ENG', 'CRO', 4, 2, true), m('GHA', 'PAN', 1, 0, true),
    m('ENG', 'GHA', 0, 0, true), m('PAN', 'CRO', 0, 1, true),
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
  'F-4': [1, 0], 'F-5': [0, 1],
  'G-4': [1, 1], 'G-5': [0, 3],
  'H-4': [1, 1], 'H-5': [1, 1],
  'I-4': [0, 1], 'I-5': [1, 0],
  'J-4': [1, 0], 'J-5': [1, 0],
  'K-3': [1, 0], 'K-4': [0, 1], 'K-5': [0, 1],
  'L-2': [1, 0], 'L-3': [0, 1], 'L-4': [1, 0], 'L-5': [0, 1],
}

export const POINTS = [3, 2, 1, 1] // 1st, 2nd, 3rd, 4th
export const ORD = ['1st', '2nd', '3rd', '4th']

// Who made the picks in each group.
export const PICKER = {
  A: 'Singer', E: 'Singer', I: 'Singer',
  B: 'Kyle', F: 'Kyle', J: 'Kyle',
  C: 'Spencer', G: 'Spencer', K: 'Spencer',
  D: 'Sebo', H: 'Sebo', L: 'Sebo',
}

// Strategy tooltips per group — shown via the "?" icon in each header.
// Two games left in every group; best-case (ceiling) scenarios below.
export const TIPS = {
  A: { tagline: 'ceiling 7/7 · Mexico & Korea hold the keys', bullets: [
    { label: 'Clean 7/7', text: 'Mexico draw + Korea win, or Mexico draw + Korea draw — either locks all four regardless of scores.' },
    { label: 'Also 7/7 (watch margins)', text: 'Mexico win + Korea win works too, as long as Mexico does NOT beat Czechia by 2+ more goals than Korea beats South Africa (keeps Czechia ahead of South Africa for 3rd).' },
    { label: 'Even a Mexico loss', text: "Mexico can lose by 1 and still go 7/7 — but Korea must then WIN, or draw a scoring game. A Korea 0-0 fails (Czechia leapfrogs Korea for 2nd); Korea's draw has to at least match Czechia's goal tally (e.g. 1-1 if Czechia wins 1-0, 2-2 if Czechia wins 2-1)." },
  ] },
  B: { tagline: 'ceiling 7/7 · one make-or-break game', bullets: [
    { label: 'Root for (7/7)', text: 'Switzerland to beat Canada (locks Switzerland 1st, Canada 2nd) AND Qatar to beat Bosnia (Qatar 3rd, Bosnia 4th).' },
    { label: 'Most important', text: 'The Switzerland win is the 5-pointer — a draw or Canada win flips the top two, since Canada leads on goal difference.' },
  ] },
  C: { tagline: 'ceiling 7/7 · favorites hold', bullets: [
    { label: 'Clean 7/7', text: 'Brazil win + Morocco draw, or Brazil draw + Morocco draw — either nails all four.' },
    { label: 'Also 7/7 (watch margins)', text: "Brazil win + Morocco win works as long as Brazil's winning margin is at least Morocco's, so Brazil stays ahead on goal difference for 1st." },
  ] },
  D: { tagline: 'ceiling 4/7 · USA locked, Türkiye dead', bullets: [
    { label: 'Locked / dead', text: "USA is 1st barring a blowout loss. Türkiye 2nd is dead — 0 points, can't catch the field." },
    { label: 'The 4th point', text: 'Australia to beat or draw Paraguay → Australia 2nd, Paraguay 3rd, Türkiye 4th. That bags Paraguay’s 3rd-place pick. Australia 4th isn’t reachable, so 4/7 is the max.' },
  ] },
  E: { tagline: 'ceiling 3/7 · Germany runs it', bullets: [
    { label: 'Nearly dead', text: 'Ecuador 1st and Germany 2nd are all but gone — Germany has 6 points and a +7 goal difference.' },
    { label: 'Safe 1 pt', text: 'If Germany handles Ecuador (likely), root for Ivory Coast to beat Curaçao → Curaçao 4th.' },
    { label: 'Best realistic 2 pts', text: 'Ecuador to beat Germany by 2+ AND Ivory Coast to only draw Curaçao → Ecuador edges Ivory Coast on GD for 2nd, leaving Ivory Coast 3rd and Curaçao 4th (your 3rd + 4th picks). The 2-goal margin is what wins the GD tiebreak — a 1-goal win leaves Ivory Coast ahead.' },
    { label: 'Long shot to 3', text: 'Ecuador beats Germany AND Ivory Coast beats Curaçao by enough to leap Germany on GD → Germany slips to 2nd (worth 2) with Curaçao 4th. Very unlikely.' },
  ] },
  F: { tagline: 'ceiling 7/7 · needs a Sweden upset', bullets: [
    { label: 'Root for (7/7)', text: 'Netherlands to beat Tunisia (1st, Tunisia 4th) AND Sweden to beat Japan (Sweden 2nd, Japan 3rd).' },
    { label: 'If Japan wins instead', text: 'You keep only Netherlands 1st + Tunisia 4th (4 pts).' },
  ] },
  G: { tagline: 'ceiling 5/7 · the Belgium–Egypt play', bullets: [
    { label: 'Root for (5 pts)', text: 'Egypt to DRAW Iran (keeps Egypt 2nd) and Belgium to beat New Zealand by 3+ (Belgium jumps Egypt on GD for 1st) → Belgium 1st, Egypt 2nd.' },
    { label: 'Why not 7', text: 'In that scenario Iran finishes 3rd and New Zealand 4th — the reverse of your 3rd/4th picks. It’s the top two or nothing.' },
  ] },
  H: { tagline: 'ceiling 5/7 · root for two draws', bullets: [
    { label: 'Root for (5 pts)', text: 'Both games drawn → Spain 1st, Uruguay 2nd (Uruguay edges Cape Verde on goals scored).' },
    { label: 'Goals caveat', text: "Keep Uruguay's draw with Spain at least as high-scoring as Cape Verde's draw with Saudi — two 0-0s is cleanest. If Cape Verde's draw outscores Uruguay's, Cape Verde grabs 2nd." },
    { label: 'Why not 7', text: 'In the two-draw world Cape Verde is 3rd and Saudi 4th — reverse of your picks. It’s the top two (5) or the bottom two, never both.' },
  ] },
  I: { tagline: 'ceiling 7/7 · great spot', bullets: [
    { label: 'Root for (7/7)', text: 'France to win or draw, and Senegal to win or draw → all four land (Senegal 3rd, Iraq 4th).' },
    { label: 'Breaks it', text: 'Only a Norway win over France, or an Iraq win over Senegal, spoils it.' },
  ] },
  J: { tagline: 'ceiling 7/7 · Austria is the swing', bullets: [
    { label: 'Root for (7/7)', text: 'Austria to beat or draw Algeria (locks Austria 2nd, Algeria 3rd) and Argentina to beat or draw Jordan (1st, Jordan 4th).' },
    { label: 'Breaks it', text: 'An Algeria win takes 2nd from Austria. Argentina is 1st unless it loses while Austria wins big.' },
  ] },
  K: { tagline: 'ceiling 7/7 · two must-win games', bullets: [
    { label: 'Root for (7/7)', text: 'Portugal to beat Colombia (Portugal 1st, Colombia 2nd) AND Uzbekistan to beat DR Congo (Uzbekistan 3rd, DR Congo 4th).' },
    { label: 'Note', text: 'Both are must-wins — a Portugal slip hands Colombia 1st, and only an Uzbekistan win separates 3rd from 4th.' },
  ] },
  L: { tagline: 'ceiling 7/7 · Croatia is the swing', bullets: [
    { label: 'Root for (7/7)', text: 'England to beat Panama (1st) and Croatia to beat Ghana (Croatia 2nd, Ghana 3rd, Panama 4th).' },
    { label: 'Breaks it', text: 'A Ghana win or draw flips 2nd and 3rd.' },
  ] },
}
