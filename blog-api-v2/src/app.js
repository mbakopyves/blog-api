// Chargement des variables d'environnement depuis le fichier .env
// Doit être fait EN PREMIER avant tout autre import
require('dotenv').config();

const express        = require('express');
const swaggerUi      = require('swagger-ui-express');
const swaggerSpec    = require('./config/swagger');
const connectDB      = require('./config/database');
const articleRoutes  = require('./routes/articleRoutes');

// ─────────────────────────────────────────────────────────────
// 1. Connexion à MongoDB
// ─────────────────────────────────────────────────────────────
connectDB();

// ─────────────────────────────────────────────────────────────
// 2. Initialisation d'Express
// ─────────────────────────────────────────────────────────────
const app = express();

// Middleware pour parser le JSON dans les corps de requêtes
// Sans ça, req.body serait undefined
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// 3. Documentation Swagger
// Accessible à : http://localhost:3000/api-docs
// ─────────────────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Blog API – INF222',       // Titre de l'onglet navigateur
  customCss: '.swagger-ui .topbar { background-color: #1F4E79; }' // Couleur de la barre
}));

// ─────────────────────────────────────────────────────────────
// 4. Route d'accueil (utile pour vérifier que le serveur tourne)
// ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur Blog API – INF222 TAF1',
    auteur: 'Yankoua Mbakop Yves Stéphane – 24G2413',
    documentation: `${process.env.BASE_URL || 'http://localhost:3000'}/api-docs`,
    endpoints: {
      creerArticle:    'POST   /api/articles',
      lireArticles:    'GET    /api/articles',
      filtrerArticles: 'GET    /api/articles?categorie=Tech&date=2026-03-18',
      lireParId:       'GET    /api/articles/:id',
      modifierArticle: 'PUT    /api/articles/:id',
      supprimerArticle:'DELETE /api/articles/:id',
      rechercher:      'GET    /api/articles/search?query=texte'
    }
  });
});

// ─────────────────────────────────────────────────────────────
// 5. Routes de l'API
// ─────────────────────────────────────────────────────────────
app.use('/api', articleRoutes);

// ─────────────────────────────────────────────────────────────
// 6. Gestionnaire de routes inexistantes (404)
// ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ erreur: `Route '${req.originalUrl}' introuvable` });
});

// ─────────────────────────────────────────────────────────────
// 7. Gestionnaire d'erreurs global (500)
// Attrape toutes les erreurs non gérées dans les middlewares
// ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Erreur non gérée :', err.stack);
  res.status(500).json({ erreur: 'Erreur interne du serveur' });
});

// ─────────────────────────────────────────────────────────────
// 8. Démarrage du serveur
// Render injecte automatiquement la variable PORT dans l'environnement
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📚 Swagger UI : http://localhost:${PORT}/api-docs`);
  console.log(`🌐 API Base   : http://localhost:${PORT}/api/articles`);
});

module.exports = app;
