# Phase 1 — Construction du Graphe

## Équipe concernée

Équipe A

Durée estimée : Jour 1 à Jour 2

---

# Objectif

Construire le cœur du projet.

Cette phase doit permettre de représenter les conflits entre les Unités d'Enseignement (UE) sous forme de graphe.

Toutes les autres équipes dépendront du travail réalisé ici.

---

# Contexte

Dans ce projet :

* Chaque UE est représentée par un sommet.
* Deux UE sont reliées par une arête lorsqu'elles partagent au moins un étudiant.

Exemple :

Si l'étudiant E1 est inscrit à :

* INF201
* INF202

alors :

```text
INF201 ---- INF202
```

Une arête doit être créée.

---

# Livrable attendu

Fichier :

```text
graph/graph.py
```

---

# Fonctionnalités obligatoires

La classe Graph doit permettre :

```python
add_vertex(vertex)
add_edge(vertex1, vertex2)
get_vertices()
get_neighbors(vertex)
get_degree(vertex)
number_of_vertices()
number_of_edges()
```

---

# Structure recommandée

```python
class Graph:
    pass
```

Le stockage interne peut utiliser :

* une liste d'adjacence
* une matrice d'adjacence

Les deux représentations sont demandées dans le cahier de charges.

---

# Données d'entrée

Les données proviendront du dossier :

```text
data/
```

Exemple :

```text
students.csv
courses.csv
rooms.csv
```

Pour le moment, des données fictives peuvent être utilisées.

---

# Résultats attendus

Le graphe doit permettre :

```python
graph.get_vertices()
```

Exemple :

```python
[
    "INF201",
    "INF202",
    "INF203"
]
```

---

Exemple :

```python
graph.get_neighbors("INF201")
```

Retour :

```python
[
    "INF202",
    "INF203"
]
```

---

# Statistiques obligatoires

Le programme doit être capable d'afficher :

Nombre de sommets :

```python
graph.number_of_vertices()
```

Nombre d'arêtes :

```python
graph.number_of_edges()
```

Degré d'un sommet :

```python
graph.get_degree(vertex)
```

---

# Critères de validation

La phase sera considérée terminée si :

* Le graphe se construit correctement.
* Les arêtes sont correctement détectées.
* Les statistiques fonctionnent.
* Le code est commenté.
* Des exemples de test sont présents.

---

# Règles importantes

Ne pas implémenter :

* Welsh-Powell
* DSATUR
* Affectation des salles
* Export CSV

Cette phase doit uniquement produire un graphe fiable.

---

# Utilisation des IA

Si une IA est utilisée :

Toujours fournir :

* architecture.md
* ce document phase1_graph.md

comme contexte.

L'IA doit respecter la structure du projet existante.

---

# Transmission à l'équipe suivante

À la fin de la phase :

Créer :

```text
docs/handover/handover_phase1.md
```

Ce document devra contenir :

* fichiers modifiés ;
* méthodes disponibles ;
* exemples d'utilisation ;
* problèmes connus ;
* recommandations pour l'équipe suivante.