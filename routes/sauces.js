const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, saucesCtrl.createSauce);


module.exports = router;