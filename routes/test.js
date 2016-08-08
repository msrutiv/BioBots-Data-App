var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("results", {title: "Hello", data: "Please Work"});
});

module.exports = router