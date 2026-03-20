const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // On se connecte à MongoDB avec l'URI dans le fichier .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    // Si la connexion échoue, on affiche l'erreur et on arrête le serveur
    console.error(`❌ Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1); // Code 1 = arrêt avec erreur
  }
};

module.exports = connectDB;
