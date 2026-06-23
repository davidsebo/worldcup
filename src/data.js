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
    m('POR', 'UZB', 5, 0, true), m('COL', 'COD', 0, 0, false),
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
export const TIPS = {
  A: { tagline: 'ceiling 7/7 · all live', bullets: [
    { label: 'Root for', text: 'Mexico to win or draw, and S. Korea to win or draw — that combo tends to lock all four in order.' },
    { label: 'Watch out', text: 'Czechia beating Mexico and Korea winning big can flip the top two.' },
  ] },
  B: { tagline: 'ceiling 7/7 · one make-or-break game', bullets: [
    { label: 'Root for', text: 'Switzerland to beat Canada — a draw or Canada win flips both top picks (Canada leads on goal difference). This one result swings 5 points.' },
    { label: 'Bonus', text: 'Qatar to upset Bosnia (your 3rd/4th are the reverse of the current order).' },
  ] },
  C: { tagline: "ceiling 7/7 · favorites' friend", bullets: [
    { label: 'Root for', text: 'Brazil to beat Scotland, and Morocco to beat Haiti — favorites winning nails all four.' },
    { label: 'Watch out', text: 'If Morocco outscores a slipping Brazil, they swap 1st and 2nd.' },
  ] },
  D: { tagline: 'ceiling 4/7 · partly locked out', bullets: [
    { label: 'Root for', text: 'USA to win or draw (locks 1st), and Australia to beat or draw Paraguay (puts Paraguay 3rd).' },
    { label: 'Dead', text: "Türkiye 2nd (0 points, can't climb) and Australia 4th (won't fall that far). Don't chase them." },
  ] },
  E: { tagline: 'ceiling 2/7 · weakest group', bullets: [
    { label: 'Dead', text: "Ecuador 1st (can't catch Germany) and Germany 2nd (Germany wins the group)." },
    { label: 'Long shot for 2 pts', text: 'Ecuador to beat Germany by 2+ goals (the margin matters for the goal-difference tiebreaker with Ivory Coast) and Ivory Coast to only draw Curaçao → Ivory Coast 3rd, Curaçao 4th.' },
    { label: 'Safe single point', text: 'Curaçao loses → Curaçao 4th.' },
  ] },
  F: { tagline: 'ceiling 7/7 · needs a Sweden upset', bullets: [
    { label: 'Root for', text: 'Netherlands to beat Tunisia (lock 1st), and Sweden to upset Japan (gives Sweden 2nd, Japan 3rd).' },
    { label: 'If Japan beats Sweden instead', text: 'You keep only Netherlands 1st + Tunisia 4th (4 pts).' },
  ] },
  G: { tagline: 'ceiling 5/7 · top and bottom picks fight', bullets: [
    { label: 'Root for (the 5-pt play)', text: 'Belgium to beat New Zealand by 3 goals, and Egypt to draw Iran → Belgium 1st, Egypt 2nd.' },
    { label: 'Important', text: 'If Egypt wins, it takes 1st and you lose both top picks.' },
    { label: "Why you can't get more", text: 'NZ 3rd / Iran 4th would need NZ to steal points off Belgium — which kills Belgium 1st.' },
  ] },
  H: { tagline: 'ceiling 5/7 · updated → root for two draws', bullets: [
    { label: 'Root for', text: 'Both games drawn → Spain 1st, Uruguay 2nd. Uruguay edges Cape Verde for 2nd on goals scored.' },
    { label: 'Goals caveat', text: "Keep Uruguay's draw at least as high-scoring as Cape Verde's — two 0-0s is cleanest. (If Cape Verde's draw outscores Uruguay's by 2+, Cape Verde grabs 2nd.)" },
    { label: "Why you can't get more", text: "In that two-draw world Cape Verde finishes 3rd, Saudi 4th (reverse of your picks). Saudi can only pass Cape Verde by beating them, which would also bump Uruguay out of 2nd — so it's the top two (5 pts) or the bottom two, never both. Take the 5." },
  ] },
  I: { tagline: 'ceiling 7/7 · great spot', bullets: [
    { label: 'Root for', text: 'France to win or draw (a draw still gives France 1st on GD), and Senegal to win or draw → Senegal 3rd, Iraq 4th.' },
    { label: 'Note', text: 'Only a Norway win or an Iraq win breaks anything.' },
  ] },
  J: { tagline: 'ceiling 7/7 · clean', bullets: [
    { label: 'Root for', text: 'Argentina to beat Jordan (locks 1st + Jordan 4th), and Austria to beat Algeria → Austria 2nd, Algeria 3rd.' },
    { label: 'Note', text: 'Only an Algeria win swaps your middle two.' },
  ] },
  K: { tagline: 'ceiling 7/7 · open, two rounds left', bullets: [
    { label: 'Root for', text: 'Portugal to win both (1st) · Colombia to beat DR Congo (2nd) · Uzbekistan to beat DR Congo in their head-to-head, with DR Congo also losing to Colombia → Uzbekistan 3rd, DR Congo 4th.' },
  ] },
  L: { tagline: 'ceiling 7/7 · open, Croatia is the swing', bullets: [
    { label: 'Root for', text: 'England to win both (1st) · Croatia to win both (beat Panama, then Ghana) to climb from 0 to 2nd · Ghana losing to both England and Croatia → Ghana 3rd · Panama losing out → 4th.' },
    { label: 'Note', text: 'Leans entirely on Croatia winning twice.' },
  ] },
}
