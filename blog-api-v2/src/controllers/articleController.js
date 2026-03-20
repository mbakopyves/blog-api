// On importe le modèle Article pour interagir avec la base de données
const Article = require('../models/Article');


// ─────────────────────────────────────────────────────────────
// POST /api/articles  →  Créer un article
// ─────────────────────────────────────────────────────────────
exports.creerArticle = async (req, res) => {
  try {
    // On crée un nouvel objet Article avec les données envoyées dans le corps de la requête
    const article = new Article(req.body);

    // On sauvegarde l'article dans MongoDB
    // Si un champ requis manque, Mongoose lance une erreur de validation → catch 400
    await article.save();

    // 201 = création réussie, on renvoie l'article créé avec son ID généré par MongoDB
    res.status(201).json({
      message: 'Article créé avec succès',
      article
    });

  } catch (err) {
    // 400 = erreur de validation (ex: titre manquant, contenu trop court…)
    res.status(400).json({ erreur: err.message });
  }
};


// ─────────────────────────────────────────────────────────────
// GET /api/articles  →  Lire tous les articles (avec filtres)
// ─────────────────────────────────────────────────────────────
exports.lireArticles = async (req, res) => {
  try {
    // On construit un objet "filtre" dynamiquement selon les paramètres de l'URL
    // Exemple : GET /api/articles?categorie=Tech&date=2026-03-18
    const filtre = {};

    // Si le paramètre "categorie" est présent dans l'URL, on filtre par catégorie
    if (req.query.categorie) {
      filtre.categorie = req.query.categorie;
    }

    // Si le paramètre "auteur" est présent, on filtre par auteur
    if (req.query.auteur) {
      filtre.auteur = req.query.auteur;
    }

    // Si une date est fournie, on récupère les articles à partir de cette date
    // $gte = "greater than or equal" (opérateur MongoDB)
    if (req.query.date) {
      filtre.date = { $gte: new Date(req.query.date) };
    }

    // On cherche les articles correspondant au filtre, triés du plus récent au plus ancien
    const articles = await Article.find(filtre).sort({ date: -1 });

    // 200 = succès, on renvoie le tableau JSON des articles
    res.status(200).json(articles);

  } catch (err) {
    // 500 = erreur inattendue côté serveur
    res.status(500).json({ erreur: err.message });
  }
};


// ─────────────────────────────────────────────────────────────
// GET /api/articles/:id  →  Lire un article par son ID
// ─────────────────────────────────────────────────────────────
exports.lireArticleParId = async (req, res) => {
  try {
    // req.params.id contient l'ID passé dans l'URL (ex: /api/articles/661abc...)
    const article = await Article.findById(req.params.id);

    // Si aucun article n'est trouvé avec cet ID → 404 Not Found
    if (!article) {
      return res.status(404).json({ erreur: 'Article non trouvé' });
    }

    // 200 = succès, on renvoie l'article
    res.status(200).json(article);

  } catch (err) {
    // Peut arriver si l'ID est malformé (pas un ObjectId MongoDB valide)
    res.status(500).json({ erreur: err.message });
  }
};


// ─────────────────────────────────────────────────────────────
// PUT /api/articles/:id  →  Modifier un article
// ─────────────────────────────────────────────────────────────
exports.modifierArticle = async (req, res) => {
  try {
    // findByIdAndUpdate cherche l'article par ID et le met à jour avec req.body
    // { new: true }         → renvoie le document APRÈS modification (pas avant)
    // { runValidators: true } → applique les validations du schéma lors de la mise à jour
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Si l'article n'existe pas → 404
    if (!article) {
      return res.status(404).json({ erreur: 'Article non trouvé' });
    }

    // 200 = succès, on renvoie l'article modifié
    res.status(200).json({
      message: 'Article modifié avec succès',
      article
    });

  } catch (err) {
    // 400 si les nouvelles valeurs ne passent pas la validation
    res.status(400).json({ erreur: err.message });
  }
};


// ─────────────────────────────────────────────────────────────
// DELETE /api/articles/:id  →  Supprimer un article
// ─────────────────────────────────────────────────────────────
exports.supprimerArticle = async (req, res) => {
  try {
    // findByIdAndDelete cherche et supprime l'article en une seule opération
    const article = await Article.findByIdAndDelete(req.params.id);

    // Si l'article n'existe pas → 404
    if (!article) {
      return res.status(404).json({ erreur: 'Article non trouvé' });
    }

    // 200 = succès, confirmation de suppression
    res.status(200).json({ message: 'Article supprimé avec succès' });

  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};


// ─────────────────────────────────────────────────────────────
// GET /api/articles/search?query=texte  →  Rechercher des articles
// ─────────────────────────────────────────────────────────────
exports.rechercherArticles = async (req, res) => {
  try {
    const { query } = req.query; // On récupère le paramètre "query" dans l'URL

    // Si le paramètre "query" n'est pas fourni → 400 Bad Request
    if (!query || query.trim() === '') {
      return res.status(400).json({ erreur: 'Le paramètre "query" est requis' });
    }

    // $or → cherche dans "titre" OU dans "contenu"
    // $regex → recherche de texte partiel (comme un LIKE en SQL)
    // $options: 'i' → insensible à la casse (majuscules/minuscules ignorées)
    const articles = await Article.find({
      $or: [
        { titre:   { $regex: query, $options: 'i' } },
        { contenu: { $regex: query, $options: 'i' } }
      ]
    });

    // 200 = succès, tableau des articles trouvés (peut être vide [])
    res.status(200).json(articles);

  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};
