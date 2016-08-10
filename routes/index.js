var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var firebase = require('firebase');

var today = new Date();
var day = today.getDate();
var month = parseInt(today.getMonth()) + 1;
var year = today.getYear().toString().slice(1);
var date = day + '-' + month.toString() + '-' + year;

//File upload set up
var storage  = multer.diskStorage({
	destination: function(req, file, callback) {

		callback(null, __dirname + '/../public/data');
	},

	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}
});
var upload = multer({storage: storage});


//Firebase set up
var config = {
	apiKey: "AIzaSyDm4wV6CqAeIy9-KZW1v445Loz-6hN2GGQ",
	databaseURL: "https://biobots-data-app.firebaseio.com",
};
firebase.initializeApp(config);
var database = firebase.database();

//Router Calls
router.get('/', function(req, res, next) {
	res.render('index', {upload: ""});
});

router.post('/upload', upload.single('dataFile'), uploadData);

function uploadData(req, res) {
	//upload file then upload data to firebase database
	// console.log("look at me I'm here");
	var filepath = req.file.path;
	var filename = req.file.filename.toString();
	var name = filename.split(".");
	var data = "";
	var data_in = fs.readFileSync(filepath, 'utf8', function(error, data) {
		if(error) {
			return console.log(error);
		}
		else console.log(data);
	});

	try { data = JSON.parse(data_in); }
	catch(e) { alert(e); }

	for (var i=0; i < data.length; i++) {
		database.ref(name[0]+'_'+date+'/Entry'+i.toString()).set(data[i]);
	}	
	res.render("index", {upload: "Upload Completed!"});
}


module.exports = router;
