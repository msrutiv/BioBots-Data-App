var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var database = firebase.database();


router.post('/', getEntry);


function getEntry(req, res, next) {
	var entrynum = req.body.entrynum
	console.log(entrynum)
	var group = Math.floor(entrynum/100);
	//var data = {};
	var query = database.ref("Group"+group.toString()+"/Entry"+entrynum.toString());
	query.once('value', function(snapshot) {
	var data = snapshot.val();
	//res.end();
	console.log(data);
	res.render('results', { title: 'Your Best Nightmare', data: data.print_data}); 
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
