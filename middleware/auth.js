const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // On créé un const à partir de de la rêquete et du header authorization. On va séparer les éléments autour d'un espace. Ce qui nous retournera un tableau avec Bearer en premier élément et le token en 2e. On gardera alors uniquement le 2nd element.
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // On vient décoder le token. Lorsque le token est décodé, cela devient un objet JS...
        const userId = decodedToken.userId; //...et on peut venir récupérer le User Id qui est dedans.
        req.auth = { userId: userId }; // la reqête comprend userId
        if (req.body.userId && req.body.userId !== userId) { // S'il y a un userId dans le corps de la requête et que celui-ci est différent du userId.
            throw 'User ID non valable !'// Renvoie une erreur
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json ({ error : error | 'Requête non authentifiée !'})

    }
};