# Blog API – INF222 EC1 TAF1

> API RESTful backend pour la gestion d'un blog simple  
> **Auteur :** Yankoua Mbakop Yves Stéphane – 24G2413  
> **UE :** INF222 – Développement Backend – Université de Yaoundé 1  
> **Technologies :** Node.js · Express.js · MongoDB · Mongoose · Swagger

---

## Table des matières

1. [Technologies utilisées](#technologies-utilisées)
2. [Structure du projet](#structure-du-projet)
3. [Installation en local](#installation-en-local)
4. [Endpoints de l'API](#endpoints-de-lapi)
5. [Exemples d'utilisation](#exemples-dutilisation)
6. [Codes HTTP utilisés](#codes-http-utilisés)
7. [Documentation Swagger](#documentation-swagger)
8. [Déploiement sur Render](#déploiement-sur-render)

---

## Technologies utilisées

| Technologie | Rôle |
|-------------|------|
| Node.js v18+ | Environnement d'exécution JavaScript côté serveur |
| Express.js 4 | Framework web pour créer les routes et middlewares |
| MongoDB | Base de données NoSQL pour stocker les articles |
| Mongoose 8 | ODM (Object Document Mapper) pour interagir avec MongoDB |
| swagger-jsdoc | Génération de la spec Swagger depuis les commentaires JSDoc |
| swagger-ui-express | Interface web interactive pour tester l'API |
| dotenv | Gestion des variables d'environnement |

---

## Structure du projet

```
blog-api/
├── src/
│   ├── app.js                        # Point d'entrée, configuration Express
│   ├── config/
│   │   ├── database.js               # Connexion MongoDB
│   │   └── swagger.js                # Configuration Swagger
│   ├── models/
│   │   └── Article.js                # Schéma Mongoose (structure des données)
│   ├── controllers/
│   │   └── articleController.js      # Logique métier (CRUD + recherche)
│   └── routes/
│       └── articleRoutes.js          # Définition des endpoints + doc Swagger
├── .env.example                      # Modèle de fichier d'environnement
├── package.json
└── README.md
```

---

## Installation en local

### Prérequis

- [Node.js](https://nodejs.org) v18 ou supérieur
- [MongoDB](https://www.mongodb.com/try/download/community) installé localement  
  **OU** un compte [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuit)
- npm (inclus avec Node.js)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/[votre-username]/blog-api.git
cd blog-api

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Ouvrir .env et renseigner MONGO_URI et BASE_URL

# 4. Démarrer le serveur
npm start

# Pour le développement (redémarrage automatique)
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

---

## Endpoints de l'API

| Méthode | Endpoint | Description | Code succès |
|---------|----------|-------------|-------------|
| `POST` | `/api/articles` | Créer un article | 201 |
| `GET` | `/api/articles` | Lire tous les articles | 200 |
| `GET` | `/api/articles?categorie=Tech` | Filtrer par catégorie | 200 |
| `GET` | `/api/articles?auteur=Yves` | Filtrer par auteur | 200 |
| `GET` | `/api/articles?date=2026-03-18` | Filtrer par date | 200 |
| `GET` | `/api/articles/:id` | Lire un article par ID | 200 |
| `PUT` | `/api/articles/:id` | Modifier un article | 200 |
| `DELETE` | `/api/articles/:id` | Supprimer un article | 200 |
| `GET` | `/api/articles/search?query=texte` | Rechercher un article | 200 |

---

## Exemples d'utilisation

### Créer un article – `POST /api/articles`

**Corps de la requête :**
```json
{
  "titre": "Introduction à Node.js",
  "contenu": "Node.js est un environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome.",
  "auteur": "Yankoua Yves",
  "categorie": "Tech",
  "tags": ["nodejs", "javascript", "backend"]
}
```

**Réponse (201) :**
```json
{
  "message": "Article créé avec succès",
  "article": {
    "_id": "661abc123def456ghi789jkl",
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement...",
    "auteur": "Yankoua Yves",
    "categorie": "Tech",
    "tags": ["nodejs", "javascript", "backend"],
    "date": "2026-03-20T10:00:00.000Z",
    "createdAt": "2026-03-20T10:00:00.000Z",
    "updatedAt": "2026-03-20T10:00:00.000Z"
  }
}
```

---

### Lire tous les articles – `GET /api/articles`

```
GET http://localhost:3000/api/articles
```

### Filtrer par catégorie et date – `GET /api/articles?categorie=Tech&date=2026-03-18`

```
GET http://localhost:3000/api/articles?categorie=Tech&date=2026-03-18
```

### Rechercher – `GET /api/articles/search?query=Node`

```
GET http://localhost:3000/api/articles/search?query=Node
```

### Modifier un article – `PUT /api/articles/:id`

```json
{
  "titre": "Node.js pour les débutants",
  "categorie": "Développement"
}
```

---

## Codes HTTP utilisés

| Code | Signification | Quand ? |
|------|--------------|---------|
| `200` | OK | Requête réussie (lecture, modification, suppression) |
| `201` | Created | Article créé avec succès |
| `400` | Bad Request | Données invalides ou paramètre manquant |
| `404` | Not Found | Article introuvable avec cet ID |
| `500` | Internal Server Error | Erreur inattendue côté serveur |

---

## Documentation Swagger

Une fois le serveur démarré, la documentation interactive est accessible à :

```
http://localhost:3000/api-docs
```

Elle permet de :
- Voir tous les endpoints documentés
- Tester chaque endpoint directement depuis le navigateur
- Visualiser les schémas de données (Article, erreurs…)

---

## Déploiement sur Render

### Prérequis

1. Un compte [Render](https://render.com) (gratuit)
2. Un compte [MongoDB Atlas](https://www.mongodb.com/atlas) pour la base de données en ligne
3. Le code poussé sur GitHub

### Étapes

#### 1. Créer la base de données sur MongoDB Atlas

1. Créer un compte sur [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Créer un **cluster gratuit (M0)**
3. Créer un utilisateur base de données (username + password)
4. Dans **Network Access**, ajouter `0.0.0.0/0` (autoriser toutes les IPs)
5. Copier l'URI de connexion : `mongodb+srv://user:password@cluster.mongodb.net/blogdb`

#### 2. Déployer sur Render

1. Aller sur [render.com](https://render.com) → **New → Web Service**
2. Connecter ton dépôt GitHub
3. Configurer :
   - **Build Command :** `npm install`
   - **Start Command :** `npm start`
   - **Runtime :** Node
4. Dans **Environment Variables**, ajouter :
   - `MONGO_URI` → ton URI MongoDB Atlas
   - `BASE_URL` → l'URL de ton app Render (ex: `https://blog-api-xxxx.onrender.com`)
5. Cliquer **Deploy**

L'API sera accessible à :  
`https://blog-api-xxxx.onrender.com/api/articles`

La documentation Swagger sera à :  
`https://blog-api-xxxx.onrender.com/api-docs`

---

## Bonnes pratiques appliquées

- Séparation claire **routes / contrôleurs / modèles**
- Validation des entrées via les contraintes Mongoose (`required`, `minlength`, `trim`)
- Codes HTTP appropriés pour chaque situation
- Gestion des erreurs avec `try/catch` sur chaque contrôleur
- Gestionnaire d'erreurs global dans `app.js`
- Variables d'environnement via `.env` (jamais de secrets dans le code)
- Documentation complète via Swagger/OpenAPI 3.0
