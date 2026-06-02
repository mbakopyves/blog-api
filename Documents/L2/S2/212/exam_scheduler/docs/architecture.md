# Architecture du Projet

> **Note** : ce fichier architecture.md est écrit tout en s'inspirant du fichier **CDC_Projet_Coloration_Graphes_L2.pdf**, donc vous pouvez vous en servir comme référence global.

## Projet

Planification d'Examens par Coloration de Graphes

## Contexte

Le projet consiste à développer une application permettant d'organiser automatiquement les examens d'un établissement à l'aide de la théorie des graphes.

Chaque Unité d'Enseignement (UE) est représentée par un sommet.

Deux UE sont reliées par une arête lorsqu'elles possèdent au moins un étudiant en commun.

Le problème de planification devient alors un problème de coloration de graphe :

* Une couleur représente un créneau d'examen.
* Deux sommets adjacents ne peuvent jamais avoir la même couleur.

L'objectif est de produire automatiquement un planning d'examens valide.

---

# Architecture du projet

```text
exam_scheduler/
│
├── data/
├── docs/
├── graph/
├── coloring/
├── planning/
├── visualization/
├── tests/
├── main.py
└── README.md
```

---

# Organisation des équipes

## Équipe A : Modélisation du graphe

Responsabilités :

* Chargement des données
* Construction du graphe
* Matrice d'adjacence
* Liste d'adjacence
* Calcul des degrés

Livrable :

```text
graph/graph.py
```

---

## Équipe B : Visualisation

Responsabilités :

* Visualisation avec NetworkX
* Génération d'image PNG
* Vérification visuelle du graphe

Livrable :

```text
visualization/graph_view.py
```

---

## Équipe C : Welsh-Powell

Responsabilités :

* Étude de l'algorithme
* Implémentation
* Tests

Livrable :

```text
coloring/welsh_powell.py
```

---

## Équipe D : DSATUR

Responsabilités :

* Étude de l'algorithme
* Implémentation
* Tests

Livrable :

```text
coloring/dsatur.py
```

---

## Équipe E : Planning

Responsabilités :

* Affectation des salles
* Vérification des contraintes
* Génération du planning
* Export CSV

Livrable :

```text
planning/scheduler.py
```

---

# Workflow de développement

Le projet suit un développement séquentiel.

Ordre des équipes :

1. Équipe A
2. Équipe B
3. Équipe C
4. Équipe D
5. Équipe E

Chaque équipe :

1. Récupère la dernière version du dépôt.
2. Lit le document de transmission de l'équipe précédente.
3. Développe sa fonctionnalité.
4. Teste son code.
5. Met à jour la documentation.
6. Effectue un commit.
7. Pousse les modifications sur GitHub.

---

# Contraintes du projet

## Contraintes obligatoires

* Un étudiant ne compose qu'une seule UE par créneau.
* Une salle ne peut accueillir qu'un seul examen par créneau.
* La capacité de la salle doit être respectée.
* Un surveillant ne peut surveiller deux examens simultanément.
* Les UE nécessitant un laboratoire doivent être placées dans une salle adaptée.

---

# Contraintes souhaitées

* Éviter les examens consécutifs d'une même filière.
* Répartir uniformément les examens.
* Prioriser les UE à fort effectif.
* Respecter les interdictions explicites entre certaines UE.

---

# Contrat de développement

Tous les modules doivent respecter les interfaces définies dans ce document.

Aucune équipe ne doit modifier le travail d'une équipe précédente sans justification et validation du chef de projet.

---

# Format attendu du graphe

Le graphe devra être manipulé via une classe `Graph`.

Exemple :

```python
graph = Graph()
```

Fonctionnalités minimales :

```python
add_vertex(vertex)
add_edge(vertex1, vertex2)
get_neighbors(vertex)
get_degree(vertex)
get_vertices()
```

---

# Format attendu de la coloration

Tous les algorithmes de coloration devront retourner :

```python
{
    "INF201": 1,
    "INF202": 2,
    "INF203": 1
}
```

où :

* clé = code UE
* valeur = numéro du créneau

---

# Format attendu du planning

Exemple :

```python
[
    {
        "course": "INF201",
        "timeslot": 1,
        "room": "LAB1"
    }
]
```

---

# Utilisation des IA

Chaque équipe doit :

* Lire ce document avant de commencer.
* Fournir ce document comme contexte aux assistants IA utilisés.
* Respecter l'architecture définie.
* Ne pas générer de code incompatible avec les modules précédents.

## architecture a respercté pour le dossier docs

```texte
docs/
│
├── architecture.md
│
├── phase1_graph.md
├── phase2_visualization.md
├── phase3_welsh_powell.md
├── phase4_dsatur.md
├── phase5_scheduler.md
│
└── handover/
    ├── handover_phase1.md
    ├── handover_phase2.md
    ├── handover_phase3.md
    ├── handover_phase4.md
```

Sequence de travaille:

```texte
Equipe A
↓
phase1_graph.md
↓
handover_phase1.md

Equipe B
↓
phase2_visualization.md
↓
handover_phase2.md

Equipe C
↓
phase3_welsh_powell.md
...
```

---

# Objectif final

Produire :

* Le code source complet.
* Le graphe visualisé en PNG.
* Le planning exporté en CSV.
* Le rapport PDF.
* Une présentation orale de 10 minutes.