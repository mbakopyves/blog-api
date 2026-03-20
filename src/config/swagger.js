const swaggerJsdoc = require('swagger-jsdoc');

// Options de configuration de Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Version OpenAPI utilisée
    info: {
      title: 'Blog API – INF222 TAF1',
      version: '1.0.0',
      description: `
## API Backend pour la gestion d'un blog simple

Développée par **Yankoua Mbakop Yves Stéphane** (24G2413)  
Université de Yaoundé 1 – INF222 EC1 – Développement Backend

### Fonctionnalités
- Créer, lire, modifier et supprimer des articles
- Rechercher des articles par mot-clé
- Filtrer par catégorie, auteur ou date

### Codes HTTP utilisés
| Code | Signification |
|------|--------------|
| 200  | Succès |
| 201  | Création réussie |
| 400  | Requête mal formée |
| 404  | Ressource non trouvée |
| 500  | Erreur serveur interne |
      `,
      contact: {
        name: 'Yankoua Mbakop Yves Stéphane',
        email: 'votre.email@exemple.com'
      }
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000',
        description: 'Serveur actif'
      }
    ],
    tags: [
      {
        name: 'Articles',
        description: 'Toutes les opérations sur les articles du blog'
      }
    ]
  },
  // Swagger va lire les commentaires JSDoc dans les fichiers de routes
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
