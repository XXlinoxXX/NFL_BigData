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

const TEAMS = {
  home: {
    id: "home",
    name: "HOME TEAM",
    nameFr: "Équipe locale",
    color: "#2f6df6",      // liseré bleu
    players: [
      makePlayer("wr", {
        overall: 90,
        player: { name: "J. Carter", number: "18", line1: "WR", line2: "1 180 YDS · 9 TD" },
        delta: { "Vitesse": +3, "Route Running": +2, "Réception": +1 }
      }),
      makePlayer("te", {
        overall: 86,
        player: { name: "M. Hughes", number: "87", line1: "TE", line2: "640 YDS · 6 TD" },
        delta: { "Réception": +3, "Blocage de course": +2 }
      }),
      makePlayer("rb", {
        overall: 88,
        player: { name: "D. Reyes", number: "22", line1: "RB", line2: "1 240 YDS · 11 TD" },
        delta: { "Vision": +2, "Agilité": +3, "Accélération": +2 }
      })
    ]
  },
  away: {
    id: "away",
    name: "VISITORS",
    nameFr: "Équipe extérieure",
    color: "#e0393b",      // liseré rouge
    players: [
      makePlayer("wr", {
        overall: 85,
        player: { name: "H. Pintans", number: "11", line1: "WR", line2: "980 YDS · 7 TD" },
        delta: { "Vitesse": -2, "Séparation": -2, "YAC": +1 }
      }),
      makePlayer("te", {
        overall: 82,
        player: { name: "A. Donald", number: "84", line1: "TE", line2: "510 YDS · 4 TD" },
        delta: { "Réception": -3, "Blocage de course": +2, "Force": +2 }
      }),
      makePlayer("rb", {
        overall: 84,
        player: { name: "F. Moreau", number: "26", line1: "RB", line2: "1 010 YDS · 8 TD" },
        delta: { "Puissance": +3, "Vitesse": -2, "Vision": -1 }
      })
    ]
  }
};
