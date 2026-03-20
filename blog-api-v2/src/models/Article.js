const mongoose = require('mongoose');

// Définition du schéma d'un article
// Un schéma décrit la structure des documents stockés dans MongoDB
const articleSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre est obligatoire'],  // Champ requis avec message d'erreur
      trim: true,                                     // Supprime les espaces en début/fin
      minlength: [3, 'Le titre doit contenir au moins 3 caractères']
    },

    contenu: {
      type: String,
      required: [true, 'Le contenu est obligatoire'],
      minlength: [10, 'Le contenu doit contenir au moins 10 caractères']
    },

    auteur: {
      type: String,
      required: [true, "L'auteur est obligatoire"],
      trim: true
    },

    date: {
      type: Date,
      default: Date.now  // Date automatique si non fournie
    },

    categorie: {
      type: String,
      trim: true,
      default: 'General'
    },

    tags: {
      type: [String],  // Tableau de chaînes de caractères
      default: []
    }
  },
  {
    // timestamps ajoute automatiquement createdAt et updatedAt
    timestamps: true
  }
);

// Création du modèle "Article" basé sur le schéma
// Mongoose va créer automatiquement une collection "articles" dans MongoDB
module.exports = mongoose.model('Article', articleSchema);
