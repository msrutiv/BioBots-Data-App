var express = require('express');
var router = express.Router();


//var data = {};

// router.post('/upload', uploadData);

// function uploadData(req, res) {
// 	console.log(req.body.filepath);
// 	res.send('done');
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});




module.exports = router;
