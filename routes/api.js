const express = require('express');

const main = require('../controllers/main');

const router = express.Router();

router.get('/addQuestion', main.addQuestion);
router.post('/addQuestion', main.postAddQuestion);





module.exports = router;