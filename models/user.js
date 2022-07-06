const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema ({
    email : { type : String, require : true, unique: true }, // unique = true --> permet d'éviter à 2 utilisateurs d'utiliser la même adresse courriel},
    password : { type : String, require : true},
});

userSchema.plugin(uniqueValidator); // Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail, nous utiliserons le mot clé unique pour l'attribut email du schéma d'utilisateur userSchema. Les erreurs générées par défaut par MongoDB pouvant être difficiles à résoudre, nous installerons un package de validation pour prévalider les informations avant de les enregistrer : npm install mongoose-unique-validator

module.exports = mongoose.model('User', userSchema);