var express = require('express');
var router = express.Router();

var firebase = require('firebase');

var config = {
		apiKey: "3uGDnp1doN6SMPSWfxHpncNJmq6DZDVwUlpj1rkK",
	    databaseURL: "https://biobots-data-analysis-79b63.firebaseio.com",
	    };

firebase.initializeApp(config);
var database = firebase.database();

// var filepath = '/Users/Sruti/Desktop/BioBots2/biobots/public/data/bioprint-data.json';
// var fs = require('fs');
// var data_in = JSON.parse(fs.readFileSync(filepath, 'utf8'));

// for (var i=0; i < data_in.length; i++) {
// 	var group = Math.floor(i/100);
// 	database.ref('Group'+group.toString()+'/Entry'+i.toString()).set(data_in[i]);
// }

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
