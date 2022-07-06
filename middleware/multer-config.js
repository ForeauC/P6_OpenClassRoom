const { diskStorage } = require('multer');
const multer = require('multer');

// Création d'un "dictionnaire" d'extensions
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({ // Fonction de multer pour enregistrer sur le disk. Nous créons une constante storage , à passer à multer comme configuration, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants.
 destination: (req, file, callback) => {
     callback(null, 'images') // null = il n'y a pas eu d'erreur. La fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;
 },
 filename: (req, file, callback) => { // => Générer le nouveau nom du fichier
    const name = file.originalname.split(' ').join('_'); // Permet de créer supprimer les espaces et les remplacer par un underscore (les espaces dans les noms des fichiers peuvent créer des pb côté server).
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension) // Date.now() -> ajoute un timestamp pour rendre le nom le plus unique possible.
    },
 
})

module.exports = multer({ storage: storage }).single('image'); // single() --> il s'agit d'un fichier unique et non pas d'un groupe de fichier.