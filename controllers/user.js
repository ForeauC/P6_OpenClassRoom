const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ncrypt = require('ncrypt-js');
const secretKey = "test";
const ncryptObject = new ncrypt(secretKey); // Librairie  légère de chiffrement et de déchiffrement de données javascript.

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Permet d'hasher(crypter) le mdp. On passe le corps du mdp qui sera passé par le front. Le "salt" correspond au nombre de fois où l'algo de hashage est exécuté.
    .then(hash => {
        const emailCrypt = ncryptObject.encrypt(req.body.email); // Chiffrement de la donnée
        const user = new User({ // Enregistrement du nouvel utilisateur dans la bdd
            email : emailCrypt, // Adresse indiqué dans le corps de la requête
            password : hash // On enregistre le hash du mdp et non le mdp en blanc
        });
        user.save() // Enregistrement dans la BDD
            .then(() => res.status(201).json({message : "Utilisateur créé !"}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    const emailCrypt = ncryptObject.encrypt(req.body.email);
    User.findOne({ email : emailCrypt }) // On récupère l'utilisateur de la base qui correspond à l'adresse courriel entrée
    .then(user => {
        if(!user) { // Si on ne reçoit pas de user, on renvoit une erreur
            return res.status(404).json(({ error: 'Utilisateur non trouvé !'}));
        }
        bcrypt.compare(req.body.password, user.password) // La méthode compare de bcrypt compare un string avec un hash pour, par exemple, vérifier si un mot de passe entré par l'utilisateur correspond à un hash sécurisé enregistré en base de données.
            .then(valid => {
                if(!valid) { // Si la comparaison n'est pas bonne, on renvoie une erreur
                    return res.status(401).json(({ error: 'Mot de passe incorrect!'}));
                }
                res.status(200).json({ // Sinon, on renvoie son UserId et un Token
                    userId: user._id,
                    token: jwt.sign( // À l'intérieur nous dictons les données que nous souhaitons encoder dans ce toker (payload).
                        { userId: user._id }, // Données que l'on veut encoder -> payload. Le UserId est encodé car on ne veut pas qu'un user soit en capacité de modifier les informations d'un autres UserId.
                        'pGMxeYRlo4cRcsvjMYhp', // Clef secrete pour l'encodage. En production, on utiliserait une chaîne de caractère beaucoup plus longue et aléatoire.
                        { expiresIn : '24h' } // Configuration : chaque Token durera 24h
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};