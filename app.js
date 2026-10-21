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
  // --- Playbook / simulation ---
  const fieldTurf   = document.querySelector(".field-turf");
  const routesLayer = document.getElementById("routesLayer");
  const ball        = document.getElementById("ball");
  const pbList      = document.getElementById("pbList");
  const pbDesc      = document.getElementById("pbDesc");
  const pbSim       = document.getElementById("pbSim");
  const pbSideEl    = document.getElementById("pbSide");
  const pbSideHome  = document.getElementById("pbSideHome");
  const pbSideAway  = document.getElementById("pbSideAway");

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
    // Re-dessine l'aperçu des tracés si un plan est sélectionné (et hors simu).
    if (typeof selectedPb !== "undefined" && selectedPb && !simRunning) {
      drawRoutes(selectedPb, simSide);
    }
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

  /* ---------- Photo du joueur (avec repli "avatar initiales") ----------
     - Si le joueur a un champ player.photo (chemin d'image), on l'affiche.
     - Sinon (ou si l'image est introuvable), on génère un avatar rond
       avec les initiales, teinté à la couleur de l'équipe.
     Pour mettre de vraies photos : déposez un fichier dans img/ et renseignez
     "photo" dans ROSTERS (data.js), ex: photo:"img/hill.png".              */
  function initials(name) {
    const parts = String(name).replace(/[^A-Za-zÀ-ÿ.\s]/g, "").split(/[.\s]+/).filter(Boolean);
    if (!parts.length) return "??";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  function avatarHTML(pl, team) {
    const col = (team && team.color) || "#444";
    return `<span class="fd-avatar" style="--ac:${col}">${initials(pl.player.name)}</span>`;
  }
  function playerPhoto(pl, team) {
    const src = pl.player.photo;
    if (src) {
      // L'image remplace l'avatar ; si elle échoue, on retombe sur les initiales.
      const fb = avatarHTML(pl, team).replace(/"/g, "&quot;");
      return `<img class="fd-img" src="${src}" alt="${pl.player.name}"
        onerror="this.outerHTML='${fb}'" />`;
    }
    return avatarHTML(pl, team);
  }

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
            <div class="fd-photo">${playerPhoto(pl, team)}</div>
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

  /* ---------- Joueurs de figuration (NON interactifs) ----------
     Pastille ronde poste + numéro. Pas de clic : seuls WR/TE/RB sont
     analysables (des deux côtés du terrain).                          */
  function buildFillers(team, container) {
    (team.fillers || []).forEach(f => {
      const el = document.createElement("div");
      el.className = "puck filler " + (team.id === "home" ? "home" : "away");
      el.style.left = f.x + "%";
      el.style.top  = f.y + "%";
      el.style.setProperty("--tc", team.color || "#888");
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

  /* ========================================================================
     PLAYBOOKS — sélection + simulation animée
     ======================================================================== */

  const SVG_NS = "http://www.w3.org/2000/svg";
  const VB_H = 56.25;                 // hauteur du viewBox (16:9 -> 100 x 56.25)
  const POS_ORDER = ["wr", "te", "rb"];

  let simSide   = "home";             // équipe simulée : "home" | "away"
  let selectedPb = null;              // playbook sélectionné
  let simRunning = false;             // une animation est en cours ?

  // Convertit un point {x,y} (en % terrain) vers les coords du viewBox SVG,
  // en miroitant l'axe x pour l'équipe de droite (away).
  function toField(pt, side) {
    const x = side === "away" ? 100 - pt.x : pt.x;
    return { x, y: (pt.y / 100) * VB_H };
  }

  // Construit une chaîne "path" lissée (courbe de Catmull-Rom -> Bézier).
  function pathFrom(points) {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  // Dessine les 3 tracés du playbook sélectionné pour le côté choisi.
  function drawRoutes(pb, side) {
    routesLayer.innerHTML = "";
    routesLayer.classList.remove("draw");
    const team = TEAMS[side];
    const color = (team && team.color) || "#f5d76e";

    POS_ORDER.forEach(posId => {
      const raw = pb.routes[posId];
      if (!raw) return;
      const pts = raw.map(p => toField(p, side));
      const d = pathFrom(pts);

      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("class", "route-path");
      path.setAttribute("d", d);
      path.setAttribute("stroke", posId === pb.carrier ? "#f5d76e" : color);
      routesLayer.appendChild(path);
      // longueur réelle pour l'anim de dash
      const len = path.getTotalLength();
      path.style.setProperty("--len", len.toFixed(1));

      // flèche en bout de tracé
      const end = pts[pts.length - 1];
      const prev = pts[pts.length - 2] || pts[0];
      const ang = Math.atan2(end.y - prev.y, end.x - prev.x);
      const head = document.createElementNS(SVG_NS, "polygon");
      const s = 1.4;
      const ax = end.x, ay = end.y;
      const p1x = ax - s * Math.cos(ang - 0.5), p1y = ay - s * Math.sin(ang - 0.5);
      const p2x = ax - s * Math.cos(ang + 0.5), p2y = ay - s * Math.sin(ang + 0.5);
      head.setAttribute("class", "route-head");
      head.setAttribute("points", `${ax},${ay} ${p1x},${p1y} ${p2x},${p2y}`);
      head.setAttribute("fill", posId === pb.carrier ? "#f5d76e" : color);
      routesLayer.appendChild(head);
    });

    // relance l'animation de tracé
    void routesLayer.offsetWidth;
    routesLayer.classList.add("draw");
  }

  function clearRoutes() {
    routesLayer.innerHTML = "";
    routesLayer.classList.remove("draw");
  }

  // Place une pastille (par poste) à une position % terrain.
  function puckFor(side, posId) {
    const container = side === "home" ? playersHome : playersAway;
    const idx = POS_ORDER.indexOf(posId);
    return container.querySelectorAll(".puck:not(.filler)")[idx] || null;
  }

  // easing doux
  function easeInOut(t) { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }

  // Interpole une polyligne (liste de points %) à l'avancement t (0..1).
  function lerpPath(points, t) {
    if (points.length === 1) return points[0];
    // longueurs de segments
    const segs = [];
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const dx = points[i+1].x - points[i].x;
      const dy = points[i+1].y - points[i].y;
      const L = Math.hypot(dx, dy);
      segs.push(L); total += L;
    }
    let dist = t * total, i = 0;
    while (i < segs.length && dist > segs[i]) { dist -= segs[i]; i++; }
    if (i >= segs.length) return points[points.length - 1];
    const f = segs[i] ? dist / segs[i] : 0;
    return {
      x: points[i].x + (points[i+1].x - points[i].x) * f,
      y: points[i].y + (points[i+1].y - points[i].y) * f
    };
  }

  // Lance la simulation du playbook sélectionné.
  function simulate() {
    if (!selectedPb || simRunning) return;
    const pb = selectedPb, side = simSide;
    const team = TEAMS[side];
    simRunning = true;
    pbSim.disabled = true;
    fieldTurf.classList.add("simulating");

    // 1) dessiner les tracés
    drawRoutes(pb, side);

    // Tracés en % terrain pour chaque poste (pour déplacer les pastilles)
    const routesPct = {};
    POS_ORDER.forEach(posId => {
      const raw = pb.routes[posId];
      if (raw) routesPct[posId] = raw.map(p => ({ x: side === "away" ? 100 - p.x : p.x, y: p.y }));
    });

    // Pastille porteuse + point de snap (QB) miroité
    const carrierPuck = puckFor(side, pb.carrier);
    const qb = { x: side === "away" ? 100 - QB_SPOT.x : QB_SPOT.x, y: QB_SPOT.y };

    // Réinitialise le marquage de porteur
    [playersHome, playersAway].forEach(c =>
      c.querySelectorAll(".puck.carrier").forEach(p => p.classList.remove("carrier")));

    const DRAW_MS  = 650;   // temps pour tracer les routes avant de bouger
    const MOVE_MS  = 1700;  // déplacement des joueurs le long des tracés
    const SNAP_MS  = pb.play === "run" ? 420 : 620; // ballon QB -> porteur

    // Position le ballon au snap
    ball.classList.add("live");
    setBallPct(qb);

    const startAll = performance.now() + DRAW_MS;

    function frame(now) {
      const elapsed = now - startAll;
      // phase 1 : les joueurs courent leurs tracés
      const tMove = Math.max(0, Math.min(1, elapsed / MOVE_MS));
      const e = easeInOut(tMove);
      POS_ORDER.forEach(posId => {
        const pts = routesPct[posId];
        const puck = puckFor(side, posId);
        if (!pts || !puck) return;
        const p = lerpPath(pts, e);
        puck.style.left = p.x + "%";
        puck.style.top  = p.y + "%";
      });

      // phase 2 : le ballon. Snap QB -> porteur, puis suit le porteur.
      if (elapsed < SNAP_MS) {
        const ts = easeInOut(Math.max(0, elapsed) / SNAP_MS);
        const carrierPts = routesPct[pb.carrier];
        const target = carrierPts ? lerpPath(carrierPts, easeInOut(Math.min(1, elapsed / MOVE_MS))) : qb;
        setBallPct({ x: qb.x + (target.x - qb.x) * ts, y: qb.y + (target.y - qb.y) * ts });
      } else {
        const carrierPts = routesPct[pb.carrier];
        if (carrierPts) setBallPct(lerpPath(carrierPts, e));
        if (carrierPuck && !carrierPuck.classList.contains("carrier")) {
          carrierPuck.classList.add("carrier");
        }
      }

      if (tMove < 1) {
        requestAnimationFrame(frame);
      } else {
        endSimulation();
      }
    }

    function endSimulation() {
      // petit délai puis remise en place
      setTimeout(() => {
        ball.classList.remove("live");
        fieldTurf.classList.remove("simulating");
        clearRoutes();
        // replace les pastilles à leur position initiale
        rebuildTeams();
        simRunning = false;
        pbSim.disabled = false;
      }, 700);
    }

    requestAnimationFrame(frame);
  }

  // Place le ballon à une position en % terrain.
  function setBallPct(p) {
    ball.style.left = p.x + "%";
    ball.style.top  = p.y + "%";
    ball.style.transform = "translate(-50%, -50%) scale(1)";
  }

  // Rend les 5 cartes de playbook.
  function renderPlaybookList() {
    pbList.innerHTML = PLAYBOOKS.map((pb, i) => `
      <button class="pb-card" type="button" role="option" data-id="${pb.id}" aria-selected="false">
        <span class="pb-tag">${pb.play === "run" ? "COURSE" : "PASSE"}</span>
        <span class="pb-emoji">${pb.emoji}</span>
        <span class="pb-name">${pb.name}</span>
        <span class="pb-namefr">${pb.nameFr}</span>
      </button>`).join("");

    pbList.querySelectorAll(".pb-card").forEach(card => {
      card.addEventListener("click", () => {
        if (simRunning) return;
        selectPlaybook(card.dataset.id);
      });
    });
  }

  function selectPlaybook(id) {
    selectedPb = PLAYBOOKS.find(p => p.id === id) || null;
    pbList.querySelectorAll(".pb-card").forEach(c => {
      const on = c.dataset.id === id;
      c.classList.toggle("selected", on);
      c.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (selectedPb) {
      pbDesc.textContent = selectedPb.desc;
      pbSim.disabled = false;
      // aperçu statique des tracés (sans bouger les joueurs)
      if (!simRunning) drawRoutes(selectedPb, simSide);
    } else {
      pbSim.disabled = true;
    }
  }

  function setSide(side) {
    if (simRunning) return;
    simSide = side;
    pbSideHome.classList.toggle("active", side === "home");
    pbSideAway.classList.toggle("active", side === "away");
    pbSideEl.innerHTML = side === "home"
      ? 'Côté <b>DOMICILE</b>' : 'Côté <b>EXTÉRIEUR</b>';
    if (selectedPb) drawRoutes(selectedPb, simSide);  // re-aperçu miroité
  }

  function buildPlaybookUI() {
    renderPlaybookList();
    pbSim.addEventListener("click", simulate);
    pbSideHome.addEventListener("click", () => setSide("home"));
    pbSideAway.addEventListener("click", () => setSide("away"));
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
  buildPlaybookUI();
})();
