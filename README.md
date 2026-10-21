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

- **Sélection interactive** : trois cartes façon FIFA. Un clic → l'affichage
  « zoome » sur la fiche détaillée du poste (transition animée).
- **Attributs notés 0–99** regroupés par famille : **Technique**, **Physique**,
  **Mental / Jeu** (barres animées, codes couleur selon le niveau).
- **Stats tactiques** repères par poste (séparation, yards après contact,
  blitz pickup, etc.).
- **Archétypes** de joueur (ex : X / Z / Slot pour le WR).
- **Points de coaching** : check-list d'évaluation / scouting.
- **Français** avec la terminologie **US** entre parenthèses (ex : *route running*,
  *yards after catch*).

> Les valeurs sont **illustratives** : elles donnent une grille de lecture.
> Remplacez-les dans `data.js` par vos propres relevés pour un joueur réel.

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
