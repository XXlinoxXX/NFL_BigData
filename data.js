/* =========================================================================
   Données des postes offensifs NFL — WR · TE · RB
   Barème des attributs : 0–99 (style FIFA / Ultimate Team)
   Contenu orienté COACHS : analyse tactique + technique.
   Chaque attribut porte une traduction US entre parenthèses.
   ========================================================================= */

const POSITIONS = [
  /* ------------------------------------------------------------------ */
  /* WIDE RECEIVER                                                       */
  /* ------------------------------------------------------------------ */
  {
    id: "wr",
    abbr: "WR",
    name: "Wide Receiver",
    nameFr: "Receveur large",
    tagline: "Le vecteur vertical — étirer et attaquer la défense",
    accent: "#13c2c2",
    accent2: "#0b7285",
    emoji: "🎯",
    overall: 88,
    archetypes: [
      { label: "X (Isolé)", desc: "Receveur n°1, souvent en isolation sur le côté fort. Gagne en 1-contre-1, bon en contested catch." },
      { label: "Z (Flanker)", desc: "Aligné en retrait de la ligne, bénéficie de l'élan (motion). Lecture de coverage et séparation." },
      { label: "Slot", desc: "Receveur intérieur. Vitesse de rupture, lecture du leverage, exploitation des zones courtes/intermédiaires." }
    ],
    // Attributs notés, regroupés par famille
    groups: [
      {
        title: "Technique", short: "TEC",
        attrs: [
          { key: "Route Running", us: "route running", val: 90, tip: "Précision des tracés, vendre les fausses pistes, timing avec le QB." },
          { key: "Réception", us: "catching / hands", val: 88, tip: "Mains sûres, catch radius, finir les prises contestées." },
          { key: "Séparation", us: "separation", val: 87, tip: "Créer de l'espace au break, releases variés face au press." },
          { key: "Ajustements en l'air", us: "ball tracking", val: 85, tip: "Suivre le ballon profond, ajuster la trajectoire, contact catch." }
        ]
      },
      {
        title: "Physique", short: "PHY",
        attrs: [
          { key: "Vitesse", us: "speed / 40-yd", val: 92, tip: "Vitesse de pointe pour la menace verticale (go route, post)." },
          { key: "Accélération", us: "burst / explosiveness", val: 90, tip: "Premiers appuis, sortir du press, gagner le top de la route." },
          { key: "Agilité", us: "agility / COD", val: 88, tip: "Changement de direction (change of direction) sur les tracés cassés." },
          { key: "Détente", us: "vertical / jump", val: 84, tip: "Jump ball, 50-50, high point du ballon en zone rouge." }
        ]
      },
      {
        title: "Mental / Jeu", short: "IQ",
        attrs: [
          { key: "Lecture de défense", us: "coverage read", val: 83, tip: "Identifier man vs zone, trouver le soft spot, ajuster le tracé (option route)." },
          { key: "Blocage", us: "run blocking", val: 72, tip: "Engagement sur les courses extérieures (crack, stalk block)." },
          { key: "YAC", us: "yards after catch", val: 86, tip: "Gagner du terrain après la prise, forcer les manqués." }
        ]
      }
    ],
    // Repères d'évaluation / coaching points
    coaching: [
      "Vérifier la variété des <b>releases</b> face au press-man (speed release, swim, hesitation).",
      "Évaluer la constance des mains sur <b>contested catches</b> (taux de prise en couverture serrée).",
      "Mesurer la <b>séparation</b> au point de rupture (step distance) plutôt que la vitesse brute.",
      "Noter la capacité à lire le <b>leverage</b> du DB et à convertir les option routes."
    ],
    // Statistiques tactiques repères
    statLines: [
      { label: "Séparation moy. à la réception", us: "avg separation", value: "2,9 yd" },
      { label: "Taux de prise contestée", us: "contested catch %", value: "48 %" },
      { label: "Yards après réception / rec.", us: "YAC per rec.", value: "5,1 yd" },
      { label: "Taux de drops", us: "drop rate", value: "4,2 %" }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* TIGHT END                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: "te",
    abbr: "TE",
    name: "Tight End",
    nameFr: "Ailier rapproché",
    tagline: "L'hybride — mismatch entre LB et DB, et aide au blocage",
    accent: "#f59f00",
    accent2: "#b36b00",
    emoji: "🧩",
    overall: 85,
    archetypes: [
      { label: "In-line (Y)", desc: "Aligné au contact de la ligne offensive. Priorité blocage, puissance au point d'attaque." },
      { label: "Move / Flex", desc: "Détaché en slot ou en wing. Crée des mismatches de réception sur linebackers." },
      { label: "H-back", desc: "Mobile en backfield, utilisé en lead block, play-action et chip puis route." }
    ],
    groups: [
      {
        title: "Technique", short: "TEC",
        attrs: [
          { key: "Réception", us: "catching / hands", val: 85, tip: "Mains fiables en trafic, exploiter le catch radius sur seam et out." },
          { key: "Tracés", us: "route running", val: 80, tip: "Tracés intermédiaires (seam, corner, drag) et timing play-action." },
          { key: "Blocage de course", us: "run blocking", val: 84, tip: "Blocage en-ligne (in-line), reach et down block au point d'attaque." },
          { key: "Blocage de passe", us: "pass protection", val: 78, tip: "Chip sur le edge rusher, aide la tackle, assignations de protection." }
        ]
      },
      {
        title: "Physique", short: "PHY",
        attrs: [
          { key: "Force", us: "strength / power", val: 86, tip: "Déplacer les défenseurs au point d'attaque, tenir l'ancrage (anchor)." },
          { key: "Taille / Allonge", us: "size / length", val: 88, tip: "Avantage de high point et de boîte de réception sur les DB." },
          { key: "Vitesse", us: "speed", val: 78, tip: "Menace sur la seam, étirer la zone intermédiaire." },
          { key: "Agilité", us: "agility", val: 76, tip: "Changements de direction sur les tracés et après la prise." }
        ]
      },
      {
        title: "Mental / Jeu", short: "IQ",
        attrs: [
          { key: "Polyvalence", us: "versatility", val: 87, tip: "Jouer in-line, flex et H-back — valeur schématique élevée." },
          { key: "Lecture de défense", us: "coverage read", val: 80, tip: "Trouver le trou de zone (sit in zone), lire man vs zone sur le snap." },
          { key: "Intelligence de jeu", us: "football IQ", val: 83, tip: "Assignations de protection + conversions de tracés sur blitz." }
        ]
      }
    ],
    coaching: [
      "Juger la capacité à être un <b>vrai Y in-line</b> : peut-il bloquer un defensive end seul ?",
      "Chercher le <b>mismatch</b> : trop rapide pour un LB, trop grand pour un nickel.",
      "Évaluer la propreté des <b>assignations de protection</b> (identification du blitz).",
      "Mesurer l'efficacité des blocs au <b>point d'attaque</b> (déplacement du 1er niveau)."
    ],
    statLines: [
      { label: "Taux de prise sur la seam", us: "seam catch %", value: "71 %" },
      { label: "Taux de blocs gagnés (course)", us: "run block win %", value: "63 %" },
      { label: "Snaps in-line / détaché", us: "in-line vs detached", value: "58 % / 42 %" },
      { label: "Yards après contact / rec.", us: "YAC over expected", value: "+1,4 yd" }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* RUNNING BACK                                                        */
  /* ------------------------------------------------------------------ */
  {
    id: "rb",
    abbr: "RB",
    name: "Running Back",
    nameFr: "Porteur de balle",
    tagline: "Le moteur du sol — vision, explosivité et protection",
    accent: "#e64980",
    accent2: "#a61e4d",
    emoji: "⚡",
    overall: 86,
    archetypes: [
      { label: "Workhorse", desc: "Porteur bellcow. Gros volume de courses, endurance et constance au contact." },
      { label: "Scat / Receiving", desc: "Explosif et dangereux dans le jeu aérien (route back), danger en espace." },
      { label: "Power", desc: "Course de puissance entre les tacles, casse les plaquages, short-yardage." }
    ],
    groups: [
      {
        title: "Technique", short: "TEC",
        attrs: [
          { key: "Vision", us: "vision", val: 89, tip: "Lire les blocs, trouver la cutback lane, patience derrière le blocage." },
          { key: "Jeu de jambes", us: "footwork / cuts", val: 87, tip: "Jump cut, jeu de pieds dans le trou, mettre le pied dans le sol (plant & go)." },
          { key: "Mains / Réception", us: "receiving", val: 80, tip: "Sorties de backfield (swing, wheel, angle), fiabilité en checkdown." },
          { key: "Protection de passe", us: "pass protection", val: 76, tip: "Pickup du blitz, identifier le rusher libre, cut block contrôlé." }
        ]
      },
      {
        title: "Physique", short: "PHY",
        attrs: [
          { key: "Accélération", us: "burst / explosiveness", val: 90, tip: "Franchir le trou avant qu'il se ferme, hit the hole." },
          { key: "Vitesse", us: "speed / breakaway", val: 86, tip: "Vitesse de rupture (breakaway) pour transformer en gros gains." },
          { key: "Puissance", us: "power / contact balance", val: 85, tip: "Équilibre au contact, gagner les yards après contact." },
          { key: "Agilité", us: "elusiveness", val: 88, tip: "Faire manquer en espace (juke, spin), forcer les plaquages ratés." }
        ]
      },
      {
        title: "Mental / Jeu", short: "IQ",
        attrs: [
          { key: "Prise de décision", us: "decision making", val: 85, tip: "Choisir la bonne lane, one-cut dans le zone scheme." },
          { key: "Protection du ballon", us: "ball security", val: 84, tip: "High and tight, limiter les fumbles sous contact." },
          { key: "Polyvalence (3 downs)", us: "three-down back", val: 82, tip: "Course + réception + protection = rester sur le terrain sur 3rd down." }
        ]
      }
    ],
    coaching: [
      "Observer la <b>vision</b> et la patience dans un schéma de zone (one-cut, pas de danse).",
      "Tester la fiabilité en <b>pass protection</b> : identifie-t-il le bon rusher sur blitz ?",
      "Mesurer les <b>yards après contact</b> plutôt que le total brut (qualité du blocage).",
      "Évaluer la valeur sur <b>3rd down</b> (réception + protection) pour un rôle 3-down."
    ],
    statLines: [
      { label: "Yards après contact / course", us: "yards after contact", value: "3,2 yd" },
      { label: "Taux de plaquages forcés", us: "missed tackles forced", value: "0,21 / course" },
      { label: "Taux de blitz pickup gagné", us: "pass-block win %", value: "81 %" },
      { label: "Courses explosives (10+ yd)", us: "explosive run rate", value: "11 %" }
    ]
  }
];

/* =========================================================================
   ÉQUIPES — vue "terrain" (playbook).
   Chaque équipe aligne ses 3 postes (WR · TE · RB).
   On part de la fiche de référence (POSITIONS) puis on applique un "delta"
   d'attributs + les infos joueur (nom, numéro, mini-stat de terrain).
   La structure finale de chaque joueur reste compatible avec la fiche détail.
   ========================================================================= */

// Récupère la fiche de référence d'un poste
function basePos(id) {
  return POSITIONS.find(p => p.id === id);
}

/* Fabrique un "joueur" : clone profond de la fiche poste + surcharges.
   overrides = {
     player: { name, number, line1, line2 },   // affichage sur le terrain
     overall,                                   // note globale propre au joueur
     delta: { "Nom d'attribut": +/-valeur }     // ajustements d'attributs
   }                                                                        */
function makePlayer(posId, ov) {
  const ref = JSON.parse(JSON.stringify(basePos(posId)));
  if (ov.overall != null) ref.overall = ov.overall;
  if (ov.delta) {
    ref.groups.forEach(g => g.attrs.forEach(a => {
      if (ov.delta[a.key] != null) {
        a.val = Math.max(40, Math.min(99, a.val + ov.delta[a.key]));
      }
    }));
  }
  if (ov.statLines) ref.statLines = ov.statLines;
  ref.player = ov.player;   // { name, number, line1, line2 }
  ref.posId = posId;
  return ref;
}

/* =========================================================================
   Table des équipes NFL : abréviation -> nom complet + couleur.
   Sert à l'affichage du sélecteur de match, des bandeaux et des rosters.
   (Défini AVANT TEAMS car buildPlayers/teamName/teamColor y sont utilisés.)
   ========================================================================= */
const TEAM_INFO = {
  ARI: { name: "Arizona Cardinals",      color: "#97233F" },
  ATL: { name: "Atlanta Falcons",        color: "#A71930" },
  BAL: { name: "Baltimore Ravens",       color: "#241773" },
  BUF: { name: "Buffalo Bills",          color: "#00338D" },
  CAR: { name: "Carolina Panthers",      color: "#0085CA" },
  CHI: { name: "Chicago Bears",          color: "#0B162A" },
  CIN: { name: "Cincinnati Bengals",     color: "#FB4F14" },
  CLE: { name: "Cleveland Browns",       color: "#311D00" },
  DAL: { name: "Dallas Cowboys",         color: "#003594" },
  DEN: { name: "Denver Broncos",         color: "#FB4F14" },
  DET: { name: "Detroit Lions",          color: "#0076B6" },
  GB:  { name: "Green Bay Packers",      color: "#203731" },
  HOU: { name: "Houston Texans",         color: "#03202F" },
  IND: { name: "Indianapolis Colts",     color: "#002C5F" },
  JAX: { name: "Jacksonville Jaguars",   color: "#006778" },
  KC:  { name: "Kansas City Chiefs",     color: "#E31837" },
  LA:  { name: "Los Angeles Rams",       color: "#003594" },
  LAC: { name: "Los Angeles Chargers",   color: "#0080C6" },
  LV:  { name: "Las Vegas Raiders",      color: "#000000" },
  MIA: { name: "Miami Dolphins",         color: "#008E97" },
  MIN: { name: "Minnesota Vikings",      color: "#4F2683" },
  NE:  { name: "New England Patriots",   color: "#002244" },
  NO:  { name: "New Orleans Saints",     color: "#D3BC8D" },
  NYG: { name: "New York Giants",        color: "#0B2265" },
  NYJ: { name: "New York Jets",          color: "#125740" },
  PHI: { name: "Philadelphia Eagles",    color: "#004C54" },
  PIT: { name: "Pittsburgh Steelers",    color: "#FFB612" },
  SEA: { name: "Seattle Seahawks",       color: "#002244" },
  SF:  { name: "San Francisco 49ers",    color: "#AA0000" },
  TB:  { name: "Tampa Bay Buccaneers",   color: "#D50A0A" },
  TEN: { name: "Tennessee Titans",       color: "#0C2340" },
  WAS: { name: "Washington",             color: "#5A1414" }
};
function teamName(abbr) { return (TEAM_INFO[abbr] && TEAM_INFO[abbr].name) || abbr; }
function teamColor(abbr) { return (TEAM_INFO[abbr] && TEAM_INFO[abbr].color) || "#555"; }

/* -------------------------------------------------------------------------
   Figurants (joueurs NON interactifs) — fixes, identiques pour toute équipe.
   HOME = attaque en I-Formation / AWAY = défense 4-3 Cover 2.
   ------------------------------------------------------------------------- */
const FILLERS_OFFENSE = [
  { pos: "LT", number: "76", x: 46, y: 26 },
  { pos: "LG", number: "66", x: 46, y: 38 },
  { pos: "C",  number: "55", x: 46, y: 50 },
  { pos: "RG", number: "67", x: 46, y: 62 },
  { pos: "RT", number: "73", x: 46, y: 80 },
  { pos: "QB", number: "12", x: 37, y: 50 },
  { pos: "FB", number: "44", x: 24, y: 38 },
  { pos: "WR", number: "80", x: 12, y: 88 }
];
const FILLERS_DEFENSE = [
  { pos: "DE", number: "91", x: 54, y: 26 },
  { pos: "DT", number: "99", x: 54, y: 38 },
  { pos: "DT", number: "93", x: 54, y: 62 },
  { pos: "DE", number: "90", x: 54, y: 80 },
  { pos: "LB", number: "54", x: 65, y: 30 },
  { pos: "LB", number: "52", x: 66, y: 50 },
  { pos: "LB", number: "58", x: 67, y: 66 },
  { pos: "CB", number: "24", x: 88, y: 88 }
];

/* =========================================================================
   ROSTERS — effectifs WR / TE / RB par franchise NFL (32 équipes).
   Données ILLUSTRATIVES (aucun CSV d'effectifs réels n'est fourni) mais
   DÉTERMINISTES : chaque équipe possède ses propres joueurs, numéros, notes
   et ajustements d'attributs (delta). Structure par équipe :
     { wr:{...}, te:{...}, rb:{...} }  où chaque poste =
     { name, number, overall, line2, delta }
   ========================================================================= */
const ROSTERS = {
  ARI: { wr:{name:"D. Hopkins",number:"10",overall:92,line2:"1 150 YDS · 8 TD",delta:{"Réception":+4,"Ajustements en l'air":+5,"Détente":+5}},
         te:{name:"Z. Ertz",number:"86",overall:83,line2:"560 YDS · 5 TD",delta:{"Réception":+3,"Tracés":+2}},
         rb:{name:"J. Conner",number:"6",overall:85,line2:"750 YDS · 15 TD",delta:{"Puissance":+4,"Protection du ballon":+2}} },
  ATL: { wr:{name:"C. Ridley",number:"18",overall:86,line2:"920 YDS · 7 TD",delta:{"Route Running":+3,"Séparation":+2}},
         te:{name:"K. Pitts",number:"8",overall:88,line2:"1 026 YDS · 1 TD",delta:{"Réception":+5,"Vitesse":+6,"Agilité":+5}},
         rb:{name:"M. Davis",number:"28",overall:80,line2:"500 YDS · 3 TD",delta:{"Mains / Réception":+3}} },
  BAL: { wr:{name:"M. Brown",number:"5",overall:85,line2:"1 008 YDS · 6 TD",delta:{"Vitesse":+4,"Accélération":+3}},
         te:{name:"M. Andrews",number:"89",overall:91,line2:"1 361 YDS · 9 TD",delta:{"Réception":+6,"Tracés":+5,"Polyvalence":+4}},
         rb:{name:"D. Williams",number:"47",overall:78,line2:"600 YDS · 2 TD",delta:{"Puissance":+2}} },
  BUF: { wr:{name:"S. Diggs",number:"14",overall:93,line2:"1 225 YDS · 10 TD",delta:{"Route Running":+6,"Séparation":+5,"Réception":+3}},
         te:{name:"D. Knox",number:"88",overall:81,line2:"587 YDS · 9 TD",delta:{"Blocage de course":+3,"Réception":+1}},
         rb:{name:"D. Singletary",number:"26",overall:80,line2:"870 YDS · 7 TD",delta:{"Vision":+2,"Agilité":+2}} },
  CAR: { wr:{name:"D. Moore",number:"2",overall:88,line2:"1 157 YDS · 4 TD",delta:{"YAC":+4,"Vitesse":+3,"Séparation":+2}},
         te:{name:"I. Thomas",number:"80",overall:74,line2:"210 YDS · 1 TD",delta:{"Blocage de course":+2}},
         rb:{name:"C. McCaffrey",number:"22",overall:94,line2:"442 YDS · 1 TD",delta:{"Agilité":+6,"Mains / Réception":+8,"Polyvalence (3 downs)":+8}} },
  CHI: { wr:{name:"A. Robinson",number:"12",overall:84,line2:"410 YDS · 1 TD",delta:{"Réception":+3,"Ajustements en l'air":+3}},
         te:{name:"C. Kmet",number:"85",overall:78,line2:"612 YDS · 0 TD",delta:{"Réception":+2}},
         rb:{name:"D. Montgomery",number:"32",overall:83,line2:"849 YDS · 7 TD",delta:{"Puissance":+3,"Vision":+2}} },
  CIN: { wr:{name:"J. Chase",number:"1",overall:90,line2:"1 455 YDS · 13 TD",delta:{"Vitesse":+5,"YAC":+6,"Ajustements en l'air":+4}},
         te:{name:"C. Uzomah",number:"87",overall:76,line2:"493 YDS · 5 TD",delta:{"Blocage de passe":+2}},
         rb:{name:"J. Mixon",number:"28",overall:87,line2:"1 205 YDS · 13 TD",delta:{"Vision":+3,"Puissance":+3,"Polyvalence (3 downs)":+2}} },
  CLE: { wr:{name:"J. Landry",number:"80",overall:82,line2:"570 YDS · 2 TD",delta:{"Réception":+3,"YAC":+2}},
         te:{name:"D. Njoku",number:"85",overall:80,line2:"475 YDS · 4 TD",delta:{"Vitesse":+3,"Agilité":+2}},
         rb:{name:"N. Chubb",number:"24",overall:92,line2:"1 259 YDS · 8 TD",delta:{"Puissance":+6,"Jeu de jambes":+4,"Vision":+4}} },
  DAL: { wr:{name:"C. Lamb",number:"88",overall:89,line2:"1 102 YDS · 6 TD",delta:{"Route Running":+4,"YAC":+5,"Agilité":+3}},
         te:{name:"D. Schultz",number:"86",overall:82,line2:"808 YDS · 8 TD",delta:{"Réception":+4,"Tracés":+2}},
         rb:{name:"E. Elliott",number:"21",overall:86,line2:"1 002 YDS · 10 TD",delta:{"Puissance":+4,"Protection de passe":+3}} },
  DEN: { wr:{name:"C. Sutton",number:"14",overall:83,line2:"776 YDS · 2 TD",delta:{"Détente":+4,"Ajustements en l'air":+3}},
         te:{name:"N. Fant",number:"87",overall:80,line2:"670 YDS · 4 TD",delta:{"Vitesse":+4,"Agilité":+3}},
         rb:{name:"J. Williams",number:"33",overall:81,line2:"903 YDS · 4 TD",delta:{"Accélération":+3,"Vitesse":+2}} },
  DET: { wr:{name:"A. St. Brown",number:"14",overall:84,line2:"912 YDS · 5 TD",delta:{"Route Running":+4,"Réception":+3,"YAC":+2}},
         te:{name:"T. Hockenson",number:"88",overall:84,line2:"583 YDS · 4 TD",delta:{"Réception":+4,"Tracés":+3}},
         rb:{name:"D. Swift",number:"32",overall:83,line2:"617 YDS · 5 TD",delta:{"Mains / Réception":+4,"Agilité":+3}} },
  GB:  { wr:{name:"D. Adams",number:"17",overall:94,line2:"1 553 YDS · 11 TD",delta:{"Route Running":+7,"Séparation":+6,"Réception":+5}},
         te:{name:"R. Tonyan",number:"85",overall:78,line2:"204 YDS · 2 TD",delta:{"Réception":+2}},
         rb:{name:"A. Jones",number:"33",overall:88,line2:"799 YDS · 4 TD",delta:{"Agilité":+4,"Mains / Réception":+4,"Accélération":+3}} },
  HOU: { wr:{name:"B. Cooks",number:"13",overall:84,line2:"1 037 YDS · 6 TD",delta:{"Vitesse":+5,"Accélération":+3}},
         te:{name:"B. Jordan",number:"88",overall:72,line2:"118 YDS · 0 TD",delta:{"Blocage de course":+2}},
         rb:{name:"D. Johnson",number:"31",overall:76,line2:"228 YDS · 0 TD",delta:{"Vision":+1}} },
  IND: { wr:{name:"M. Pittman",number:"11",overall:84,line2:"1 082 YDS · 6 TD",delta:{"Réception":+3,"Détente":+3,"YAC":+2}},
         te:{name:"J. Doyle",number:"84",overall:75,line2:"150 YDS · 1 TD",delta:{"Blocage de course":+3}},
         rb:{name:"J. Taylor",number:"28",overall:93,line2:"1 811 YDS · 18 TD",delta:{"Vitesse":+7,"Accélération":+6,"Vision":+5}} },
  JAX: { wr:{name:"M. Jones Jr.",number:"15",overall:80,line2:"832 YDS · 4 TD",delta:{"Vitesse":+4,"YAC":+2}},
         te:{name:"D. Arnold",number:"88",overall:72,line2:"324 YDS · 0 TD",delta:{"Vitesse":+2}},
         rb:{name:"J. Robinson",number:"25",overall:83,line2:"767 YDS · 8 TD",delta:{"Puissance":+3,"Vision":+2}} },
  KC:  { wr:{name:"T. Hill",number:"10",overall:93,line2:"1 239 YDS · 9 TD",delta:{"Vitesse":+8,"Accélération":+6,"YAC":+5}},
         te:{name:"T. Kelce",number:"87",overall:95,line2:"1 125 YDS · 9 TD",delta:{"Réception":+8,"Tracés":+8,"Polyvalence":+6}},
         rb:{name:"C. Edwards-Helaire",number:"25",overall:80,line2:"517 YDS · 4 TD",delta:{"Mains / Réception":+3}} },
  LA:  { wr:{name:"C. Kupp",number:"10",overall:95,line2:"1 947 YDS · 16 TD",delta:{"Route Running":+8,"Réception":+6,"YAC":+6}},
         te:{name:"T. Higbee",number:"89",overall:79,line2:"560 YDS · 5 TD",delta:{"Réception":+2,"Blocage de course":+1}},
         rb:{name:"D. Henderson",number:"27",overall:81,line2:"688 YDS · 5 TD",delta:{"Accélération":+3,"Agilité":+2}} },
  LAC: { wr:{name:"K. Allen",number:"13",overall:90,line2:"1 138 YDS · 6 TD",delta:{"Route Running":+6,"Séparation":+5}},
         te:{name:"J. Cook",number:"87",overall:76,line2:"180 YDS · 1 TD",delta:{"Blocage de course":+2}},
         rb:{name:"A. Ekeler",number:"30",overall:88,line2:"911 YDS · 20 TD",delta:{"Mains / Réception":+6,"Agilité":+4,"Polyvalence (3 downs)":+6}} },
  LV:  { wr:{name:"H. Renfrow",number:"13",overall:83,line2:"1 038 YDS · 9 TD",delta:{"Séparation":+5,"Route Running":+3}},
         te:{name:"D. Waller",number:"83",overall:90,line2:"665 YDS · 2 TD",delta:{"Réception":+6,"Vitesse":+5,"Taille / Allonge":+3}},
         rb:{name:"J. Jacobs",number:"28",overall:85,line2:"872 YDS · 9 TD",delta:{"Puissance":+4,"Vision":+2}} },
  MIA: { wr:{name:"J. Waddle",number:"17",overall:85,line2:"1 015 YDS · 6 TD",delta:{"Vitesse":+6,"Accélération":+4,"YAC":+3}},
         te:{name:"M. Gesicki",number:"88",overall:81,line2:"780 YDS · 2 TD",delta:{"Réception":+3,"Taille / Allonge":+4}},
         rb:{name:"M. Gaskin",number:"37",overall:77,line2:"612 YDS · 3 TD",delta:{"Mains / Réception":+2}} },
  MIN: { wr:{name:"J. Jefferson",number:"18",overall:93,line2:"1 616 YDS · 10 TD",delta:{"Route Running":+6,"YAC":+6,"Ajustements en l'air":+5}},
         te:{name:"T. Conklin",number:"83",overall:76,line2:"593 YDS · 3 TD",delta:{"Réception":+2}},
         rb:{name:"D. Cook",number:"4",overall:90,line2:"1 159 YDS · 6 TD",delta:{"Agilité":+5,"Accélération":+4,"Vision":+4}} },
  NE:  { wr:{name:"J. Meyers",number:"16",overall:80,line2:"866 YDS · 2 TD",delta:{"Route Running":+3,"Séparation":+2}},
         te:{name:"H. Henry",number:"85",overall:83,line2:"603 YDS · 9 TD",delta:{"Réception":+3,"Blocage de course":+2}},
         rb:{name:"D. Harris",number:"37",overall:82,line2:"929 YDS · 15 TD",delta:{"Puissance":+4,"Protection du ballon":+2}} },
  NO:  { wr:{name:"M. Thomas",number:"13",overall:88,line2:"blessé 2021",delta:{"Réception":+5,"Route Running":+4}},
         te:{name:"A. Trautman",number:"82",overall:73,line2:"263 YDS · 1 TD",delta:{"Blocage de course":+2}},
         rb:{name:"A. Kamara",number:"41",overall:91,line2:"898 YDS · 4 TD",delta:{"Agilité":+6,"Mains / Réception":+6,"Polyvalence (3 downs)":+5}} },
  NYG: { wr:{name:"K. Golladay",number:"19",overall:82,line2:"521 YDS · 0 TD",delta:{"Détente":+4,"Ajustements en l'air":+4}},
         te:{name:"E. Engram",number:"88",overall:78,line2:"408 YDS · 3 TD",delta:{"Vitesse":+3,"Agilité":+2}},
         rb:{name:"S. Barkley",number:"26",overall:88,line2:"593 YDS · 2 TD",delta:{"Accélération":+5,"Agilité":+4,"Puissance":+3}} },
  NYJ: { wr:{name:"C. Davis",number:"84",overall:80,line2:"492 YDS · 4 TD",delta:{"Détente":+3,"Réception":+2}},
         te:{name:"R. Griffin",number:"84",overall:72,line2:"120 YDS · 1 TD",delta:{"Blocage de passe":+2}},
         rb:{name:"M. Carter",number:"32",overall:79,line2:"639 YDS · 4 TD",delta:{"Agilité":+3,"Mains / Réception":+3}} },
  PHI: { wr:{name:"D. Smith",number:"6",overall:84,line2:"916 YDS · 5 TD",delta:{"Route Running":+4,"Séparation":+3}},
         te:{name:"D. Goedert",number:"88",overall:85,line2:"830 YDS · 4 TD",delta:{"Réception":+4,"Blocage de course":+3,"Agilité":+2}},
         rb:{name:"M. Sanders",number:"26",overall:83,line2:"754 YDS · 0 TD",delta:{"Vitesse":+3,"Accélération":+3}} },
  PIT: { wr:{name:"D. Johnson",number:"18",overall:85,line2:"1 161 YDS · 8 TD",delta:{"Réception":+4,"Détente":+4}},
         te:{name:"P. Freiermuth",number:"88",overall:79,line2:"497 YDS · 7 TD",delta:{"Réception":+3}},
         rb:{name:"N. Harris",number:"22",overall:85,line2:"1 200 YDS · 7 TD",delta:{"Mains / Réception":+5,"Puissance":+3,"Polyvalence (3 downs)":+4}} },
  SEA: { wr:{name:"D.K. Metcalf",number:"14",overall:89,line2:"967 YDS · 12 TD",delta:{"Détente":+6,"Vitesse":+5,"Ajustements en l'air":+4}},
         te:{name:"G. Everett",number:"81",overall:78,line2:"478 YDS · 4 TD",delta:{"Vitesse":+3,"Réception":+2}},
         rb:{name:"R. Penny",number:"20",overall:80,line2:"749 YDS · 6 TD",delta:{"Vitesse":+4,"Puissance":+3}} },
  SF:  { wr:{name:"D. Samuel",number:"19",overall:90,line2:"1 405 YDS · 6 TD",delta:{"YAC":+8,"Vitesse":+5,"Agilité":+4}},
         te:{name:"G. Kittle",number:"85",overall:93,line2:"910 YDS · 6 TD",delta:{"Blocage de course":+6,"Réception":+5,"Force":+5}},
         rb:{name:"E. Mitchell",number:"25",overall:80,line2:"963 YDS · 5 TD",delta:{"Vision":+3,"Accélération":+2}} },
  TB:  { wr:{name:"M. Evans",number:"13",overall:90,line2:"1 035 YDS · 14 TD",delta:{"Détente":+6,"Ajustements en l'air":+5,"Réception":+4}},
         te:{name:"R. Gronkowski",number:"87",overall:88,line2:"802 YDS · 6 TD",delta:{"Blocage de course":+5,"Réception":+4,"Force":+4}},
         rb:{name:"L. Fournette",number:"7",overall:85,line2:"812 YDS · 8 TD",delta:{"Puissance":+4,"Mains / Réception":+3}} },
  TEN: { wr:{name:"A.J. Brown",number:"11",overall:90,line2:"869 YDS · 5 TD",delta:{"YAC":+6,"Détente":+5,"Réception":+3}},
         te:{name:"G. Firkser",number:"86",overall:74,line2:"291 YDS · 0 TD",delta:{"Réception":+2}},
         rb:{name:"D. Henry",number:"22",overall:96,line2:"937 YDS · 10 TD",delta:{"Puissance":+9,"Vitesse":+5,"Protection du ballon":+4}} },
  WAS: { wr:{name:"T. McLaurin",number:"17",overall:87,line2:"1 053 YDS · 5 TD",delta:{"Route Running":+5,"Séparation":+4,"Vitesse":+3}},
         te:{name:"L. Thomas",number:"82",overall:77,line2:"428 YDS · 3 TD",delta:{"Blocage de course":+2,"Réception":+1}},
         rb:{name:"A. Gibson",number:"24",overall:82,line2:"1 037 YDS · 7 TD",delta:{"Accélération":+3,"Puissance":+2}} }
};

// Roster générique de repli si une abréviation est inconnue
const ROSTER_FALLBACK = {
  wr:{name:"WR Titulaire",number:"80",overall:82,line2:"—",delta:{}},
  te:{name:"TE Titulaire",number:"85",overall:80,line2:"—",delta:{}},
  rb:{name:"RB Titulaire",number:"28",overall:82,line2:"—",delta:{}}
};

// Construit les 3 joueurs interactifs (WR/TE/RB) d'une équipe depuis son roster
function buildPlayers(abbr) {
  const r = ROSTERS[abbr] || ROSTER_FALLBACK;
  return ["wr", "te", "rb"].map(id => {
    const s = r[id] || ROSTER_FALLBACK[id];
    return makePlayer(id, {
      overall: s.overall,
      player: { name: s.name, number: s.number, line1: id.toUpperCase(), line2: s.line2 },
      delta: s.delta || {}
    });
  });
}

/* Les 2 équipes du match courant. abbr/name/color/players sont renseignés
   dynamiquement par applyMatch() dans app.js. On initialise avec un match
   par défaut pour que le terrain s'affiche même avant toute sélection.      */
const TEAMS = {
  home: {
    id: "home",
    abbr: "KC",
    name: teamName("KC"),
    nameFr: "Équipe locale",
    color: teamColor("KC"),
    players: buildPlayers("KC"),
    fillers: FILLERS_OFFENSE
  },
  away: {
    id: "away",
    abbr: "BUF",
    name: teamName("BUF"),
    nameFr: "Équipe extérieure",
    color: teamColor("BUF"),
    players: buildPlayers("BUF"),
    fillers: FILLERS_DEFENSE
  }
};


/* =========================================================================
   PLAYBOOKS — 5 plans de jeu offensifs simulables.
   Chaque playbook définit, pour chaque poste interactif (WR / TE / RB), un
   TRACÉ (route) exprimé comme une liste de points {x,y} en % du terrain,
   dans le repère de l'ATTAQUE (équipe à gauche). Le premier point de chaque
   tracé correspond à la position de départ de la pastille (= LAYOUT).
   Pour l'équipe de DROITE (symétrique), app.js miroite x -> 100 - x.

   - routes : { wr:[...], te:[...], rb:[...] }  (postes dans l'ordre WR,TE,RB)
   - ball   : { from, to } indices/cibles du ballon (snap -> cible du QB)
              `target` = poste visé par la passe ("wr"|"te"|"rb"), ou null
              pour une course (handoff) : le ballon suit alors ce poste.
   Le point de départ du QB (snap) est fixe (voir QB_SPOT).
   ========================================================================= */

// Point de snap du QB (figurant), repère attaque gauche.
const QB_SPOT = { x: 37, y: 50 };

const PLAYBOOKS = [
  {
    id: "four-verts",
    name: "Four Verticals",
    nameFr: "Quatre verticales",
    emoji: "🚀",
    desc: "Tous les receveurs attaquent le fond du terrain. Étire la couverture en profondeur, cherche le 1-contre-1 vertical.",
    carrier: "wr",                 // poste qui reçoit le ballon
    play: "pass",
    routes: {
      wr: [ {x:42,y:10}, {x:55,y:9}, {x:72,y:8} ],       // go route (haut)
      te: [ {x:40,y:72}, {x:52,y:60}, {x:66,y:46} ],     // seam
      rb: [ {x:28,y:50}, {x:40,y:54}, {x:54,y:62} ]      // wheel/checkdown
    }
  },
  {
    id: "mesh",
    name: "Mesh Concept",
    nameFr: "Concept Mesh",
    emoji: "🔀",
    desc: "Deux tracés croisés courts (drag) créent un rub naturel. Solide contre la couverture homme, YAC en espace.",
    carrier: "te",
    play: "pass",
    routes: {
      wr: [ {x:42,y:10}, {x:46,y:30}, {x:52,y:62} ],     // drag vers le bas
      te: [ {x:40,y:72}, {x:46,y:52}, {x:54,y:24} ],     // drag vers le haut (croise)
      rb: [ {x:28,y:50}, {x:34,y:40}, {x:40,y:26} ]      // swing vers le flat haut
    }
  },
  {
    id: "power-run",
    name: "Power Run",
    nameFr: "Course de puissance",
    emoji: "🐏",
    desc: "Handoff au RB entre les tacles. Le TE scelle le bord, le WR crack-back. Jeu au sol de volume.",
    carrier: "rb",
    play: "run",
    routes: {
      wr: [ {x:42,y:10}, {x:46,y:22}, {x:50,y:34} ],     // crack block vers l'intérieur
      te: [ {x:40,y:72}, {x:48,y:74}, {x:56,y:76} ],     // down block, scelle le bord
      rb: [ {x:28,y:50}, {x:44,y:54}, {x:62,y:58}, {x:80,y:54} ] // course entre les tacles
    }
  },
  {
    id: "screen",
    name: "RB Screen",
    nameFr: "Écran au RB",
    emoji: "🧱",
    desc: "Fausse protection puis passe courte au RB derrière un mur de bloqueurs. Piège le pass-rush agressif.",
    carrier: "rb",
    play: "pass",
    routes: {
      wr: [ {x:42,y:10}, {x:48,y:14}, {x:58,y:20} ],     // bloc downfield
      te: [ {x:40,y:72}, {x:44,y:66}, {x:50,y:58} ],     // se replie pour escorter
      rb: [ {x:28,y:50}, {x:30,y:60}, {x:42,y:66}, {x:60,y:68} ] // reçoit l'écran puis remonte
    }
  },
  {
    id: "pa-boot",
    name: "PA Bootleg",
    nameFr: "Play-action bootleg",
    emoji: "🎭",
    desc: "Feinte de course, le QB roule sur le bord. Tracés à flot haut/bas : lecture haut-bas facile, protège le QB mobile.",
    carrier: "te",
    play: "pass",
    routes: {
      wr: [ {x:42,y:10}, {x:54,y:12}, {x:70,y:16} ],     // comeback profond
      te: [ {x:40,y:72}, {x:50,y:78}, {x:64,y:80} ],     // flat / out côté bootleg
      rb: [ {x:28,y:50}, {x:30,y:66}, {x:34,y:80} ]      // fuite dans le flat bas
    }
  }
];
