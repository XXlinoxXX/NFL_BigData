# 🏈 NFL Scouting Board — WR · TE · RB

Page web interactive présentant trois postes offensifs de la NFL sous un
**format carte « FIFA / Ultimate Team »**, destinée aux **coachs** pour l'analyse
tactique et technique des joueurs.

## Postes couverts

| Carte | Poste | FR |
|-------|-------|----|
| 🎯 **WR** | Wide Receiver | Receveur large |
| 🧩 **TE** | Tight End | Ailier rapproché |
| ⚡ **RB** | Running Back | Porteur de balle |

## Fonctionnalités

- **Sélecteur de match** : deux menus (semaine → match) alimentés par la saison
  NFL 2021 (`games.csv`). On peut choisir n'importe quel match ; l'équipe
  **à domicile s'affiche à gauche**, l'équipe **extérieure à droite**, avec les
  bons sigles, noms et couleurs d'équipe.
- **Effectifs propres à chaque équipe** : les 3 postes **WR · TE · RB** sont
  renseignés **par franchise** (`ROSTERS` dans `data.js`, les 32 équipes) avec
  nom, numéro, note globale, mini-stat de saison et ajustements d'attributs.
  Changer de match régénère automatiquement les joueurs des deux équipes.
- **Terrain vu du dessus** : les 11 joueurs de chaque équipe sont placés ;
  seuls les 3 postes **WR · TE · RB** sont interactifs (les 8 autres sont des
  figurants).
- **Cartes FIFA sur le terrain** : chaque joueur interactif est une mini-carte
  façon *Ultimate Team* — fond **bronze / argent / or / élite** selon la note,
  note globale + poste, nom, numéro et liseré aux couleurs de l'équipe (reflet
  brillant au survol). Elles remplacent les anciennes pastilles à émoji.
- **Sélection interactive** : un clic sur une carte → l'affichage « zoome » sur
  la fiche détaillée du joueur (transition animée).
- **Attributs notés 0–99** regroupés par famille : **Technique**, **Physique**,
  **Mental / Jeu** (barres animées, codes couleur selon le niveau).
- **Stats tactiques** repères par poste (séparation, yards après contact,
  blitz pickup, etc.).
- **Archétypes** de joueur (ex : X / Z / Slot pour le WR).
- **Points de coaching** : check-list d'évaluation / scouting.
- **Français** avec la terminologie **US** entre parenthèses (ex : *route running*,
  *yards after catch*).

> Les valeurs (notes, numéros, stats des `ROSTERS`) sont **illustratives** :
> elles donnent une grille de lecture par équipe. Remplacez-les dans `data.js`
> par vos propres relevés pour coller à vos joueurs réels.

## Données des matchs

- `games.csv` — source : calendrier NFL 2021 (gameId, semaine, date, équipes).
- `games.js` — **généré depuis le CSV** (tableau `GAMES`), chargé par la page.
  Pour régénérer après modification du CSV :
  ```bash
  python3 - <<'PY'
  import csv, json
  rows=[{"gameId":r["gameId"],"season":int(r["season"]),"week":int(r["week"]),
         "date":r["gameDate"],"time":r["gameTimeEastern"],
         "home":r["homeTeamAbbr"],"away":r["visitorTeamAbbr"]}
        for r in csv.DictReader(open("games.csv"))]
  open("games.js","w").write("const GAMES = "+json.dumps(rows,ensure_ascii=False)+";\n")
  PY
  ```
  > Le CSV est chargé via un fichier `.js` (et non `fetch`) pour que la page
  > fonctionne aussi en ouvrant simplement `index.html` en local (`file://`).

## Lancer en local

Aucune dépendance, aucun build. Ouvrez simplement `index.html` dans un navigateur,
ou servez le dossier :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Structure

```
index.html   → structure de la page
styles.css   → thème carte FIFA + fond terrain + animations
data.js      → données des postes (attributs, stats, coaching) — à personnaliser
app.js       → logique : génération des cartes + zoom + animation des barres
```

## Personnaliser un poste

Tout est dans **`data.js`**. Chaque poste suit ce schéma :

```js
{
  id, abbr, name, nameFr, tagline, accent, accent2, emoji, overall,
  archetypes: [ { label, desc } ],
  groups:     [ { title, short, attrs: [ { key, us, val, tip } ] } ],
  coaching:   [ "point d'évaluation ..." ],
  statLines:  [ { label, us, value } ]
}
```

Modifiez les `val` (0–99), les `statLines` et les `coaching` pour coller à votre
contexte d'analyse.
