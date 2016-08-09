var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var database = firebase.database();


router.post('/', getEntry);

router.post('/specific', getSpecificEntries, function(req, res, next){
	res.render('results', { title: 'Your Best Nightmare', count: req.count, entry: req.entries });

});


function getEntry(req, res, next) {
	var entrynum = req.body.entrynum;
	console.log(entrynum);
	var group = Math.floor(entrynum/100);
	//var data = {};
	var query = database.ref("9-8-116"+"/Entry"+entrynum.toString());
	query.once('value', function(snapshot) {
		var entry = snapshot.val();
		res.render('results', { title: 'Your Worst Nightmare', count: 1, entry: [entry] }); 
	});
}

function getSpecificEntries(req, res, next) {
	var parameter = parseInt(req.body.platenum);
	var count = 0;
	var entries = [];
	console.log(parameter);
		//var group = Math.floor(i/100);
	var query = database.ref("9-8-116").orderByChild('print_info/wellplate').equalTo(parameter);
	console.log(query);
	query.on("child_added", function(snapshot){
		count++;
		console.log(snapshot.val());
		entries.push(snapshot.val());
		console.log(count);
	});
	 

		//res.send("cooldude");
	 
}

module.exports = router;

//query just alive percentage