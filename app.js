const express = require('express');
const mongoose = require('mongoose');
const app = express(); // Permet de créer une application express
//const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path'); // The path module provides utilities for working with file and directory paths.


// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://ForeauC:Terminator91@cluster0.dnpnwsc.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // Intercepte toutes les requêtes qui contiennent du json et mettent à disposition le contenu sur l'objet requête dans req.body

// Empêcher les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();
});
app.use('/images', express.static(path.join(__dirname, 'images'))); // Cela indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images .

//app.use('/api/sauces', saucesRoutes); // Le début de la route est défini juste ici
app.use('/api/auth', userRoutes);
module.exports = app; // Exportation de la const "app" pour y acceder depuis les autres fichiers du projet