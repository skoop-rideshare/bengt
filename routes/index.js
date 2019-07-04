var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', (req, res) => {
    const db = req.db;
    const collection = db.get('usercollection');
    collection.find().then((docs) => res.send(docs))
});

module.exports = router;
