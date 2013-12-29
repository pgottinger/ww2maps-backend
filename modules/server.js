var restify = require('restify');
var database = require('./database.js');
var config = require('./../config.js');

(function() {

module.exports.initServer=function() {
  var server = restify.createServer();
  server.use(restify.queryParser());
  server.get('/ww2maps/getUnitsForMapBoundsAndDate', getUnitsForMapBoundsAndDate);

  server.listen(config.serverport, function() {
    console.log('%s listening at %s', server.name, server.url);
  });
}

function answer(req, res, next, data) {
  res.status(200);
  res.contentType="json";
  res.send(data);
  return next();
}

function getUnitsForMapBoundsAndDate(req, res, next) {  
  var callback = function(req, res, next, rows) {
    var json = {};   
      for(i in rows) {
        json[rows[i].unit_id]={};
        json[rows[i].unit_id].name=rows[i].unit_name;
        json[rows[i].unit_id].lat=parseFloat(rows[i].lat);
        json[rows[i].unit_id].lng=parseFloat(rows[i].lng);      
      }
      answer(req, res, next, JSON.stringify(json));     
  }
  
  database.getUnitsForMapBoundsAndDate(req, res, next, callback);
}

}());

