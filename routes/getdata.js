var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var async = require('async');

var database = firebase.database();


router.post('/', getEntry);

router.post('/specific', getSpecificEntries);


function getEntry(req, res, next) {
	//grab a single entry
	var entrynum = req.body.entrynum;
	var group = Math.floor(entrynum/100);
	var query = database.ref("9-8-116"+"/Entry"+entrynum.toString());
	query.once('value', function(snapshot) {
		var entry = snapshot.val();
		res.render('results', { title: 'Your Worst Nightmare', count: 1, entry: [entry], analysis: null}); 
	});
}

function getSpecificEntries(req, res, next) {
	//grab all entries with specific parameter, currently wellplate type
	var parameter = parseInt(req.body.platenum);
	var count = 0;
	var entries = [];
	var d_live = 0; var d_dead = 0; //delta
	var m_live = 0; var m_dead = 0; //mean
	var v_live = 0; var v_dead = 0; //variance
	var s_live = 0; var s_dead = 0; //std dev
	var max_live = 0;
	var min_live = 100;
	var query = database.ref("9-8-116").orderByChild('print_info/wellplate').equalTo(parameter);
	query.on("child_added", function(snapshot){
      count++;
      var entry = snapshot.val();
      entries.push(entry);

      //summary analysis calculations
      var live = entry.print_data.livePercent;
      var dead = entry.print_data.deadPercent;
      if (live > max_live) max_live = live;
      if (live < min_live) min_live = live;
      
      d_live = live - m_live;
      m_live += d_live/count;
      v_live += d_live*(live - m_live);

      d_dead = dead - m_dead;
      m_dead += d_dead/count;
      v_dead += d_dead*(dead - m_dead);

    }); 
    //hacky way to get around asynch calls to DB
	setTimeout( function(){
		s_live = Math.sqrt(v_live/(count-1));
		s_dead = Math.sqrt(v_dead/(count-1));
		var analysis = { avg_live: m_live.toPrecision(4), avg_dead: m_dead.toPrecision(4), 
			stdv_live: s_live.toPrecision(4), stdv_dead: s_dead.toPrecision(4), min_live: min_live, max_live: max_live};
		res.render('results', { title: 'Your Best Nightmare', count: count, entry: entries, analysis: analysis});
	}, 3500);
}

module.exports = router;