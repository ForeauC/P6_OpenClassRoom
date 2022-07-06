const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({ // Nous créons un schéma de données qui contient les champs souhaités pour chaque sauce, indique leur type ainsi que leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. 
    userId : { type : String, required : true },
    name : { type : String, required : true },
    manufacturer : { type : String, required : true },
    description : { type : String, required : true },
    mainPepper : { type : String, required : true },
    imageUrl : { type : String, required : true },
    heat : { type : Number, required : true },
    likes : { type : Number, required : true, default: 0},
    dislikes : { type : Number, required : true, default: 0},
    usersLiked : { type : Array, required : true },
    usersDisliked : { type : Array, required : true },
});

module.exports = mongoose.model('Sauce', sauceSchema); // Permet d'exporter le modèle Mongoose, le rendant par là même disponible pour notre application Express.