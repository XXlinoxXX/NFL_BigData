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

  /* ---------- Helpers ---------- */
  function rateClass(v) {
    if (v >= 88) return "rate-elite";
    if (v >= 82) return "rate-good";
    if (v >= 75) return "rate-avg";
    return "rate-low";
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

  /* ---------- Construction des pastilles ---------- */
  function buildTeam(team, container, layout) {
    team.players.forEach((pl, i) => {
      const pos = layout[i] || { x: 50, y: 50 };
      const btn = document.createElement("button");
      btn.className = "puck " + (team.id === "home" ? "home" : "away");
      btn.style.left = pos.x + "%";
      btn.style.top  = pos.y + "%";
      btn.setAttribute("aria-label",
        `${team.name} — ${pl.player.name}, ${pl.name}`);

      btn.innerHTML = `
        <div class="puck-stand">
          <div class="puck-disc">
            ${pl.emoji}
            <span class="puck-num">#${pl.player.number}</span>
            <span class="puck-ovr">${pl.overall}</span>
          </div>
          <div class="puck-tag">
            <div class="nm">${pl.player.name}</div>
            <div class="p1">${pl.player.line1}</div>
            <div class="p2">${pl.player.line2}</div>
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

    return `
      <div class="detail-head">
        <span class="team-badge ${teamClass}">${team.name}</span>
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
  buildFillers(TEAMS.home, playersHome);   // figurants d'abord (en dessous)
  buildFillers(TEAMS.away, playersAway);
  buildTeam(TEAMS.home, playersHome, LAYOUT.home);  // puis les 3 postes cliquables (au-dessus)
  buildTeam(TEAMS.away, playersAway, LAYOUT.away);
})();
