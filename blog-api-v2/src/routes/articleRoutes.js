const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/articleController');

// ─────────────────────────────────────────────────────────────
// SWAGGER : Définition du schéma "Article" (réutilisé dans toute la doc)
// ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - titre
 *         - contenu
 *         - auteur
 *       properties:
 *         _id:
 *           type: string
 *           description: Identifiant unique généré par MongoDB
 *           example: "661abc123def456ghi789jkl"
 *         titre:
 *           type: string
 *           description: Titre de l'article (min 3 caractères)
 *           example: "Introduction à Node.js"
 *         contenu:
 *           type: string
 *           description: Contenu complet de l'article (min 10 caractères)
 *           example: "Node.js est un environnement d'exécution JavaScript côté serveur..."
 *         auteur:
 *           type: string
 *           description: Nom de l'auteur de l'article
 *           example: "Yankoua Yves"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date de publication (générée automatiquement si absente)
 *           example: "2026-03-20T10:00:00.000Z"
 *         categorie:
 *           type: string
 *           description: Catégorie de l'article
 *           example: "Tech"
 *           default: "General"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste de mots-clés associés à l'article
 *           example: ["nodejs", "javascript", "backend"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création (ajoutée automatiquement par Mongoose)
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification (ajoutée automatiquement par Mongoose)
 *
 *     ArticleInput:
 *       type: object
 *       required:
 *         - titre
 *         - contenu
 *         - auteur
 *       properties:
 *         titre:
 *           type: string
 *           example: "Introduction à Node.js"
 *         contenu:
 *           type: string
 *           example: "Node.js est un environnement d'exécution JavaScript côté serveur..."
 *         auteur:
 *           type: string
 *           example: "Yankoua Yves"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-03-20T10:00:00.000Z"
 *         categorie:
 *           type: string
 *           example: "Tech"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["nodejs", "javascript", "backend"]
 *
 *     ArticleUpdate:
 *       type: object
 *       properties:
 *         titre:
 *           type: string
 *           example: "Node.js pour les débutants"
 *         contenu:
 *           type: string
 *           example: "Contenu mis à jour..."
 *         categorie:
 *           type: string
 *           example: "Développement"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["nodejs", "débutants"]
 *
 *     Erreur:
 *       type: object
 *       properties:
 *         erreur:
 *           type: string
 *           example: "Le titre est obligatoire"
 *
 *     SuccesMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Article supprimé avec succès"
 */


// ─────────────────────────────────────────────────────────────
// IMPORTANT : /search doit être déclaré AVANT /:id
// Sinon Express interpréterait "search" comme un ID
// ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par mot-clé
 *     description: Recherche dans le titre et le contenu des articles (insensible à la casse)
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher dans le titre ou le contenu
 *         example: "Node"
 *     responses:
 *       200:
 *         description: Tableau des articles correspondants (peut être vide)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Paramètre query manquant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       500:
 *         description: Erreur serveur interne
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.get('/articles/search', ctrl.rechercherArticles);


/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     description: Crée un article et le stocke dans MongoDB. Renvoie l'article créé avec son ID.
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleInput'
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article créé avec succès"
 *                 article:
 *                   $ref: '#/components/schemas/Article'
 *       400:
 *         description: Données invalides (champ requis manquant, valeur trop courte…)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.post('/articles', ctrl.creerArticle);


/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     description: |
 *       Récupère la liste complète des articles, triée du plus récent au plus ancien.
 *       Supporte des filtres optionnels par catégorie, auteur et/ou date.
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *         example: "Tech"
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *         example: "Yankoua Yves"
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Récupérer les articles à partir de cette date (format YYYY-MM-DD)
 *         example: "2026-03-18"
 *     responses:
 *       200:
 *         description: Tableau JSON de tous les articles correspondants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Erreur serveur interne
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.get('/articles', ctrl.lireArticles);


/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     description: Renvoie toutes les informations d'un article spécifique via son identifiant MongoDB.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant MongoDB de l'article
 *         example: "661abc123def456ghi789jkl"
 *     responses:
 *       200:
 *         description: Article trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       500:
 *         description: Erreur serveur (ID malformé ou autre)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.get('/articles/:id', ctrl.lireArticleParId);


/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article existant
 *     description: Met à jour le titre, contenu, catégorie ou tags d'un article via son ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant MongoDB de l'article à modifier
 *         example: "661abc123def456ghi789jkl"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleUpdate'
 *     responses:
 *       200:
 *         description: Article modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article modifié avec succès"
 *                 article:
 *                   $ref: '#/components/schemas/Article'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       404:
 *         description: Article non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.put('/articles/:id', ctrl.modifierArticle);


/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     description: Supprime définitivement un article de la base de données via son ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant MongoDB de l'article à supprimer
 *         example: "661abc123def456ghi789jkl"
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccesMessage'
 *       404:
 *         description: Article non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       500:
 *         description: Erreur serveur interne
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.delete('/articles/:id', ctrl.supprimerArticle);


module.exports = router;
