var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
var db = require('../../db/queries')

router.get('/',db.getAllCharacters);
router.post('/new',db.createCharacter);
//router.put('/change',db.changeCharacter);

module.exports = router;