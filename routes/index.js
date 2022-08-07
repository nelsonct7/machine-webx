const express = require('express');
const router = express.Router();
const {createFile,readFile} = require('../controllers/indexcontroller')

/* GET home page. */
router.route('/create').post(createFile)
router.route('/read/:id').get(readFile)

module.exports = router;
