var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var config = {
		apiKey: "3uGDnp1doN6SMPSWfxHpncNJmq6DZDVwUlpj1rkK",
	    databaseURL: "https://biobots-data-analysis-79b63.firebaseio.com",
	    };

firebase.initializeApp(config);
var database = firebase.database();


router.post('/', getEntry);


function getEntry(req, res, next) {
	console.log(req.body.entrynum)
	//var data = {};
	var query = database.ref("Entry"+req.body.entrynum);
	query.once('value', function(snapshot) {
	var data = snapshot.val();
	//res.end();
	console.log(data);
	res.render('results', { title: 'Your Best Nightmare', data: data}); 
	//res.content-Type
	//res.
	//res.send("FUCK YOU");
	//res.end();
	});
	//res.end();
	//console.log(data);
	//res.send("FUCK YOU");
	//res.end();
}

module.exports = router;
