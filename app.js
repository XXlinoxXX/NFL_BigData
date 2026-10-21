/* =========================================================================
   Logique d'interface — NFL Scouting Board
   - Génère les cartes FIFA de la vue sélection
   - Gère le "zoom" vers la fiche détaillée d'un poste
   - Anime les barres d'attributs
   ========================================================================= */

(function () {
  "use strict";

  const selection  = document.getElementById("selection");
  const cardsGrid  = document.getElementById("cardsGrid");
  const detail     = document.getElementById("detail");
  const detailInner= document.getElementById("detailInner");
  const backBtn    = document.getElementById("backBtn");

  /* ---------- Helpers ---------- */
  function rateClass(v) {
    if (v >= 88) return "rate-elite";
    if (v >= 82) return "rate-good";
    if (v >= 75) return "rate-avg";
    return "rate-low";
  }

  // Moyennes PHY / TEC pour l'affichage mini sur la carte
  function groupAvg(pos, title) {
    const g = pos.groups.find(x => x.title === title);
    if (!g) return "–";
    const sum = g.attrs.reduce((a, b) => a + b.val, 0);
    return Math.round(sum / g.attrs.length);
  }

  /* ---------- Cartes de sélection ---------- */
  function buildCards() {
    POSITIONS.forEach(pos => {
      const card = document.createElement("button");
      card.className = "fut-card";
      card.setAttribute("aria-label", `Voir la fiche ${pos.name}`);
      card.style.setProperty("--c1", pos.accent);
      card.style.setProperty("--c2", pos.accent2);

      card.innerHTML = `
        <div class="fut-inner">
          <div class="fut-top">
            <div class="fut-ovr">
              <div class="num">${pos.overall}</div>
              <div class="pos">${pos.abbr}</div>
            </div>
            <div class="fut-emoji">${pos.emoji}</div>
          </div>
          <div class="fut-name">
            ${pos.name}
            <small>${pos.nameFr}</small>
          </div>
          <div class="fut-mini">
            <div><div class="v">${groupAvg(pos, "Technique")}</div><div class="l">TEC</div></div>
            <div><div class="v">${groupAvg(pos, "Physique")}</div><div class="l">PHY</div></div>
            <div><div class="v">${groupAvg(pos, "Mental / Jeu")}</div><div class="l">IQ</div></div>
          </div>
          <div class="fut-cta">🔍 Cliquer pour zoomer</div>
        </div>`;

      card.addEventListener("click", () => openDetail(pos));
      cardsGrid.appendChild(card);
    });
  }

  /* ---------- Fiche détaillée (zoom) ---------- */
  function openDetail(pos) {
    detailInner.innerHTML = renderDetail(pos);

    // Variables de couleur locales
    detail.style.setProperty("--c1", pos.accent);
    detail.style.setProperty("--c2", pos.accent2);

    // Transition : masquer la sélection, afficher le détail
    selection.classList.add("hidden");
    detail.setAttribute("aria-hidden", "false");
    // force reflow pour déclencher la transition
    void detail.offsetWidth;
    detail.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Animer les barres après le rendu
    requestAnimationFrame(() => {
      setTimeout(() => {
        detailInner.querySelectorAll(".bar > span").forEach(s => {
          s.style.width = s.dataset.val + "%";
        });
      }, 120);
    });

    backBtn.focus();
  }

  function closeDetail() {
    detail.classList.remove("active");
    selection.classList.remove("hidden");
    setTimeout(() => detail.setAttribute("aria-hidden", "true"), 400);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderDetail(pos) {
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

    const archHtml = pos.archetypes.map(a => `
      <div class="arch"><b>${a.label}</b><span>${a.desc}</span></div>`).join("");

    const coachHtml = pos.coaching.map(c => `<li>${c}</li>`).join("");

    const statsHtml = pos.statLines.map(s => `
      <div class="stat-line">
        <div class="v">${s.value}</div>
        <div class="l">${s.label}<span class="us">${s.us}</span></div>
      </div>`).join("");

    return `
      <div class="detail-head">
        <div class="dh-ovr"><div class="num">${pos.overall}</div><div class="pos">${pos.abbr}</div></div>
        <div class="dh-text">
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
  buildCards();
})();
