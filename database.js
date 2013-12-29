var mysql = require('mysql');
var config = require('./config.js');

(function() {
var pool  = mysql.createPool({
  host     : config.dbhost,
  port     : config.dbport,
  user     : config.dbuser,
  password : config.dbpass,
  database : config.database,
  socketPath  : config.dbsocket
});

var queryUnitsForMapBoundsAndDate = "SELECT * FROM unit_locations locations LEFT JOIN units ON units.unit_id=locations.unit_id WHERE locations.date=? and locations.lat BETWEEN ? AND ? and locations.lng BETWEEN ? AND ?";
    
module.exports.getUnitsForMapBoundsAndDate = function(req, res, next, callback) {  
  pool.getConnection(function(err, connection) { 
    connection.query(queryUnitsForMapBoundsAndDate, [req.query.date,req.query.minlat,req.query.maxlat,req.query.minlng,req.query.maxlng],   function(err, rows, fields) {
      if (err) {
        throw err;
      }
    callback(req, res, next, rows);
  });
  connection.release();
  });
}



}());
