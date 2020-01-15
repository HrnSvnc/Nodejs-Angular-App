var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
var db = require('../../db/queries')

router.get('/',db.getUsers);
router.post('/register',db.checkIfExists);

module.exports = router;