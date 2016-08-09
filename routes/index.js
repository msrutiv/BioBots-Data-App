var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var today = new Date();
var date = today.getDate() + '-' + today.getMonth()+1 + '-' +today.getYear();

var storage  = multer.diskStorage(
{destination: function(req, file, callback) {
	
	callback(null, __dirname + '/../public/data');
},

filename: function(req, file, callback) {
	
	callback(null, file.originalname); //eq.originalname
}
});

var upload = multer({storage: storage});


var firebase = require('firebase');

var config = {
		apiKey: "3uGDnp1doN6SMPSWfxHpncNJmq6DZDVwUlpj1rkK",
	    databaseURL: "https://biobots-data-analysis-79b63.firebaseio.com",
	    };

firebase.initializeApp(config);
var database = firebase.database();

// var filepath = '/Users/Sruti/Desktop/BioBots2/biobots/public/data/bioprint-data.json';
// 
// var data_in = JSON.parse(fs.readFileSync(filepath, 'utf8'));

// for (var i=0; i < data_in.length; i++) {
// 	var group = Math.floor(i/100);
// 	database.ref('Group'+group.toString()+'/Entry'+i.toString()).set(data_in[i]);
// }

//var data = {};


router.post('/upload', upload.single('dataFile'), uploadData);

function uploadData(req, res) {
	console.log(req.file.path);
	 var filepath = req.file.path;
	 res.redirect('..');
	 // var data_in = JSON.parse(fs.readFileSync(filepath, 'utf8'));
	// for (var i=0; i < data_in.length; i++) {
	// var group = Math.floor(i/100);
	// database.ref(date+'/Group'+group.toString()+'/Entry'+i.toString()).set(data_in[i]);
		// }	

	

	// upload(req, res, function(error){
	// 	if (error)
	// 		return res.end("Error uploading file");
	// 	else 
	// 		res.end("Upload sucessful");

	// // })
	//console.log(req.file);
	//res.send('done');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});




module.exports = router;
