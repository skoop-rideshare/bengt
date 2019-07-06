var express = require('express');
var router = express.Router();
const intiMongo = require('../db')

router.post('/create', async (req, res) => {
	const db = await intiMongo()
	// Do work with database
	db.close()
	res.send(200)
});

router.post('/login', async (req, res) => {
	const db = await intiMongo()
	// Do work with database
	db.close()
	res.send(200)
});

module.exports = router;
