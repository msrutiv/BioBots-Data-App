var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var database = firebase.database();


router.post('/', getEntry);

router.post('/specific', getSpecificEntries);


function getEntry(req, res, next) {
	var entrynum = req.body.entrynum;
	console.log(entrynum);
	var group = Math.floor(entrynum/100);
	//var data = {};
	var query = database.ref("Group"+group.toString()+"/Entry"+entrynum.toString());
	query.once('value', function(snapshot) {
		var data = snapshot.val();
	//res.end();
	console.log(data);
	res.render('results', { title: 'Your Worst Nightmare', entrynum: entrynum, data: data}); 
	});
}

function getSpecificEntries(req, res, next) {
	var parameter = req.body.platenum;
	console.log(parameter);
	for(i=0; i<1; i++){
		//var group = Math.floor(i/100);
		var query = database.ref("Group"+i.toString()).orderByChild('print_info/wellplate').equalTo(parameter);
		query.once('value', function(snapshot) {
			var data = snapshot.val();
			console.log(data);
		});
	}
		//res.render('results', { title: 'Your Best Nightmare', data: data.print_data}); 
}

module.exports = router;

//query just alive percentage