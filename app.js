/* =========================================================================
   Logique d'interface — NFL Playbook (HOME vs VISITORS)
   - Dessine les lignes de yards du terrain
   - Place les 3 pastilles joueurs de chaque équipe (WR / TE / RB)
   - Clic sur une pastille -> "zoom" vers la fiche détaillée (style FIFA)
   ========================================================================= */

(function () {
  "use strict";

  const fieldView   = document.getElementById("fieldView");
  const yardlines   = document.getElementById("yardlines");
  const playersHome = document.getElementById("playersHome");
  const playersAway = document.getElementById("playersAway");
  const detail      = document.getElementById("detail");
  const detailInner = document.getElementById("detailInner");
  const backBtn     = document.getElementById("backBtn");
  const weekSelect  = document.getElementById("weekSelect");
  const gameSelect  = document.getElementById("gameSelect");
  const bannerHome  = document.getElementById("bannerHome");   // GAUCHE = domicile
  const bannerAway  = document.getElementById("bannerAway");   // DROITE = extérieur
  const rosterHome  = document.getElementById("rosterHome");
  const rosterAway  = document.getElementById("rosterAway");
  const navPlaybook = document.getElementById("navPlaybook");
  const navAnalytics= document.getElementById("navAnalytics");

  /* ---------- Helpers ---------- */
  function rateClass(v) {
    if (v >= 88) return "rate-elite";
    if (v >= 82) return "rate-good";
    if (v >= 75) return "rate-avg";
    return "rate-low";
  }

  /* ========================================================================
     SÉLECTEUR DE MATCH (depuis games.csv -> GAMES)
     Domicile (home) à GAUCHE, Extérieur (visitor) à DROITE.
     ======================================================================== */

  // Applique un match : met à jour sigles/noms/couleurs ET régénère les
  // joueurs (WR/TE/RB) de chaque équipe depuis son roster, puis reconstruit
  // les cartes sur le terrain.
  function applyMatch(game) {
    if (!game) return;

    // GAUCHE = équipe à domicile
    TEAMS.home.abbr    = game.home;
    TEAMS.home.name    = teamName(game.home);
    TEAMS.home.color   = teamColor(game.home);
    TEAMS.home.players = buildPlayers(game.home);
    // DROITE = équipe extérieure
    TEAMS.away.abbr    = game.away;
    TEAMS.away.name    = teamName(game.away);
    TEAMS.away.color   = teamColor(game.away);
    TEAMS.away.players = buildPlayers(game.away);

    renderBanners(game);
    rebuildTeams();
  }

  // Reconstruit entièrement les pastilles des 2 équipes (figurants + cartes)
  function rebuildTeams() {
    playersHome.innerHTML = "";
    playersAway.innerHTML = "";
    buildFillers(TEAMS.home, playersHome);
    buildFillers(TEAMS.away, playersAway);
    buildTeam(TEAMS.home, playersHome, LAYOUT.home);
    buildTeam(TEAMS.away, playersAway, LAYOUT.away);
  }

  // Bandeaux d'équipe sur les bords du terrain
  function renderBanners(game) {
    bannerHome.style.setProperty("--tc", TEAMS.home.color);
    bannerAway.style.setProperty("--tc", TEAMS.away.color);
    bannerHome.innerHTML = `
      <span class="tb-tag">DOMICILE</span>
      <span class="tb-abbr">${TEAMS.home.abbr}</span>
      <span class="tb-name">${TEAMS.home.name}</span>`;
    bannerAway.innerHTML = `
      <span class="tb-tag">EXTÉRIEUR</span>
      <span class="tb-abbr">${TEAMS.away.abbr}</span>
      <span class="tb-name">${TEAMS.away.name}</span>`;

    renderRoster(rosterHome, TEAMS.home);
    renderRoster(rosterAway, TEAMS.away);
  }

  // Mini-liste des 3 titulaires (WR/TE/RB) d'une équipe, dans le HUD de coin.
  function renderRoster(el, team) {
    if (!el) return;
    el.style.setProperty("--tc", team.color || "#888");
    const rows = team.players.map(p => `
      <div class="rb-row">
        <span class="rb-pos">${p.abbr}</span>
        <span class="rb-nm">${p.player.name}</span>
        <span class="rb-ovr">${p.overall}</span>
      </div>`).join("");
    el.innerHTML = `<span class="hud-label">${team.abbr} · TITULAIRES</span>${rows}`;
  }

  // Remplit le menu des matchs pour une semaine donnée
  function fillGameSelect(week) {
    const games = GAMES.filter(g => g.week === week);
    gameSelect.innerHTML = games.map((g, i) =>
      `<option value="${g.gameId}">${g.home} (dom.) vs ${g.away} (ext.) — ${g.date}</option>`
    ).join("");
    // applique le 1er match de la semaine
    const first = games[0];
    if (first) applyMatch(first);
  }

  // Construit le sélecteur semaine + branche les événements
  function buildGamePicker() {
    const weeks = [...new Set(GAMES.map(g => g.week))].sort((a, b) => a - b);
    weekSelect.innerHTML = weeks.map(w => `<option value="${w}">Semaine ${w}</option>`).join("");

    weekSelect.addEventListener("change", () => fillGameSelect(Number(weekSelect.value)));
    gameSelect.addEventListener("change", () => {
      const g = GAMES.find(x => x.gameId === gameSelect.value);
      applyMatch(g);
    });

    // état initial : 1re semaine, 1er match
    fillGameSelect(weeks[0]);
  }

  /* ---------- Lignes de yards ---------- */
  // Terrain : 0 à 100 % de largeur. End zones ≈ 8.5 % de chaque côté.
  function buildYardlines() {
    const ez = 8.5;                 // largeur end zone (%)
    const play = 100 - ez * 2;      // zone de jeu
    const nums = ["10","20","30","40","50","40","30","20","10"];
    for (let i = 0; i <= 10; i++) {
      const x = ez + (play * i / 10);
      const line = document.createElement("div");
      line.className = "yl" + (i === 5 ? " mid" : "");
      line.style.left = x + "%";
      yardlines.appendChild(line);
      // numéros (sauf aux lignes de but i=0 et i=10)
      if (i >= 1 && i <= 9) {
        const label = nums[i - 1];
        ["top", "bot"].forEach(pos => {
          const n = document.createElement("div");
          n.className = "num " + pos;
          n.style.left = x + "%";
          n.textContent = label;
          yardlines.appendChild(n);
        });
      }
    }
    // hash marks
    ["h1", "h2"].forEach(h => {
      const row = document.createElement("div");
      row.className = "hash-row " + h;
      for (let i = 0; i <= 50; i++) {
        const tick = document.createElement("span");
        tick.style.cssText =
          "position:absolute;width:2px;height:7px;background:rgba(255,255,255,.7);" +
          "left:" + (i * 2) + "%;top:0;";
        row.appendChild(tick);
      }
      yardlines.appendChild(row);
    });
  }

  /* ---------- Positions des pastilles sur le terrain (en %) ----------
     Home à gauche (près de ses yards), Visitors à droite.
     x = horizontal, y = vertical (haut/bas).                            */
  const LAYOUT = {
    // Vue du dessus : ligne d'engagement ~ x=46. Attaque (home) à gauche.
    home: [
      { x: 42, y: 10 },  // WR (large, tout en haut, sur la ligne)
      { x: 40, y: 72 },  // TE (bout de ligne, côté bas)
      { x: 28, y: 50 }   // RB (backfield profond, derrière le QB)
    ],
    away: [
      { x: 58, y: 10 },  // WR (large, haut), symétrique du home
      { x: 60, y: 72 },  // TE (bout de ligne, bas)
      { x: 76, y: 50 }   // RB (backfield profond)
    ]
  };

  /* ---------- Palier de carte FIFA selon la note globale ---------- */
  function cardTier(ov) {
    if (ov >= 90) return "tier-elite";   // "icône" / or spécial
    if (ov >= 84) return "tier-gold";    // or
    if (ov >= 78) return "tier-silver";  // argent
    return "tier-bronze";                // bronze
  }

  /* ---------- Construction des cartes FIFA cliquables ---------- */
  function buildTeam(team, container, layout) {
    team.players.forEach((pl, i) => {
      const pos = layout[i] || { x: 50, y: 50 };
      const btn = document.createElement("button");
      btn.className = "puck " + (team.id === "home" ? "home" : "away");
      btn.style.left = pos.x + "%";
      btn.style.top  = pos.y + "%";
      btn.style.setProperty("--tc", team.color || "#888");
      btn.setAttribute("aria-label",
        `${team.name} — ${pl.player.name}, ${pl.name}, note ${pl.overall}`);

      btn.innerHTML = `
        <div class="puck-stand">
          <div class="fdisc ${cardTier(pl.overall)}">
            <div class="fd-shine"></div>
            <span class="fd-ovr">${pl.overall}</span>
            <span class="fd-emoji">${pl.emoji}</span>
            <span class="fd-pos">${pl.abbr}</span>
            <span class="fd-num">#${pl.player.number}</span>
          </div>
          <div class="fd-tag">
            <div class="fd-name">${pl.player.name}</div>
            <div class="fd-stat">${pl.player.line2}</div>
          </div>
        </div>`;

      btn.addEventListener("click", () => openDetail(pl, team));
      container.appendChild(btn);
    });
  }

  /* ---------- Joueurs NON interactifs (figuration) ----------
     Simples pastilles : poste + numéro, pas de clic, pas de note.     */
  function buildFillers(team, container) {
    (team.fillers || []).forEach(f => {
      const el = document.createElement("div");
      el.className = "puck filler " + (team.id === "home" ? "home" : "away");
      el.style.left = f.x + "%";
      el.style.top  = f.y + "%";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = `
        <div class="puck-stand">
          <div class="puck-disc">
            <span class="filler-pos">${f.pos}</span>
            <span class="puck-num">#${f.number}</span>
          </div>
        </div>`;
      container.appendChild(el);
    });
  }

  /* ---------- Fiche détaillée (zoom) ---------- */
  function openDetail(pos, team) {
    detailInner.innerHTML = renderDetail(pos, team);
    detail.style.setProperty("--c1", pos.accent);
    detail.style.setProperty("--c2", pos.accent2);

    // Onglet actif : ANALYTICS quand on consulte la fiche d'un joueur
    navPlaybook.classList.remove("active");
    navAnalytics.classList.add("active");

    fieldView.classList.add("hidden");
    detail.setAttribute("aria-hidden", "false");
    void detail.offsetWidth;            // reflow
    detail.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    requestAnimationFrame(() => setTimeout(() => {
      detailInner.querySelectorAll(".bar > span").forEach(s => {
        s.style.width = s.dataset.val + "%";
      });
    }, 120));

    backBtn.focus();
  }

  function closeDetail() {
    // Retour au terrain : onglet actif = PLAYBOOK
    navAnalytics.classList.remove("active");
    navPlaybook.classList.add("active");

    detail.classList.remove("active");
    fieldView.classList.remove("hidden");
    setTimeout(() => detail.setAttribute("aria-hidden", "true"), 400);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderDetail(pos, team) {
    const groupsHtml = pos.groups.map(g => `
      <div class="attr-group">
        <div class="ag-title">${g.title} — <span style="opacity:.7">${g.short}</span></div>
        ${g.attrs.map(a => `
          <div class="attr">
            <div class="name">${a.key} <span class="us">(${a.us})</span></div>
            <div class="val ${rateClass(a.val)}">${a.val}</div>
            <div class="bar"><span data-val="${a.val}"></span></div>
            <div class="tip">${a.tip}</div>
          </div>`).join("")}
      </div>`).join("");

    const archHtml  = pos.archetypes.map(a => `
      <div class="arch"><b>${a.label}</b><span>${a.desc}</span></div>`).join("");
    const coachHtml = pos.coaching.map(c => `<li>${c}</li>`).join("");
    const statsHtml = pos.statLines.map(s => `
      <div class="stat-line">
        <div class="v">${s.value}</div>
        <div class="l">${s.label}<span class="us">${s.us}</span></div>
      </div>`).join("");

    const teamClass = team.id === "home" ? "home" : "away";
    const side = team.id === "home" ? "DOMICILE" : "EXTÉRIEUR";
    const abbr = team.abbr || (team.id === "home" ? "HOME" : "AWAY");

    return `
      <div class="detail-head">
        <span class="team-badge ${teamClass}" style="box-shadow: inset 0 0 0 2px ${team.color || '#888'}">
          ${abbr} · ${side}
        </span>
        <div class="dh-ovr"><div class="num">${pos.overall}</div><div class="pos">${pos.abbr}</div></div>
        <div class="dh-text">
          <div class="who">#${pos.player.number} ${pos.player.name}</div>
          <h2>${pos.name} <span class="fr">/ ${pos.nameFr}</span></h2>
          <p class="tag">${pos.tagline}</p>
        </div>
        <div class="dh-emoji">${pos.emoji}</div>
      </div>

      <div class="detail-grid">
        <div class="panel">
          <h3>Attributs d'évaluation <span class="pill">0–99</span></h3>
          ${groupsHtml}
        </div>
        <div class="col-right">
          <div class="panel" style="margin-bottom:20px">
            <h3>Archétypes <span class="pill">roles</span></h3>
            ${archHtml}
          </div>
          <div class="panel" style="margin-bottom:20px">
            <h3>Stats tactiques <span class="pill">key metrics</span></h3>
            <div class="stat-lines">${statsHtml}</div>
          </div>
          <div class="panel">
            <h3>Points de coaching <span class="pill">scouting</span></h3>
            <ul class="coach-list">${coachHtml}</ul>
          </div>
        </div>
      </div>`;
  }

  /* ---------- Événements globaux ---------- */
  backBtn.addEventListener("click", closeDetail);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && detail.classList.contains("active")) closeDetail();
  });

  /* ---------- Init ---------- */
  buildYardlines();
  // buildGamePicker -> fillGameSelect -> applyMatch -> rebuildTeams
  // se charge de construire figurants + cartes pour le match sélectionné.
  buildGamePicker();
})();
