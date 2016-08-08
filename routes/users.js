var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var config = {
		apiKey: "3uGDnp1doN6SMPSWfxHpncNJmq6DZDVwUlpj1rkK",
	    databaseURL: "https://biobots-data-analysis-79b63.firebaseio.com",
	    };

var data = { name: 'Bob', age: 42};

firebase.initializeApp(config);
var database = firebase.database();

//var entrynum = 0;



/* GET users listing. */
router.get('/', function(req, res, next) {
 	res.render('index',{ title: 'Your Best Nightmare', data: data});
 	console.log("did the thing");
// 	//res.send(data);
 });

router.post('/', getEntry);

router.post('/upload', uploadData);

function getEntry(req, res, next) {
	console.log(req.body.entrynum)
	var query = database.ref("Entry4").once('value').then(function(snapshot) {
	data = snapshot.val();
	console.log(data); 
	res.send(data);
	});
	res.end();
}

function uploadData(req, res) {
	console.log(req.body.filepath);
	res.send('done');
}

module.exports = router;


