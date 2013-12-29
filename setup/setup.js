var mysql = require("mysql");
var config = require('./../config.js');


var connection = mysql.createConnection({
  host     : config.dbhost,
  port     : config.dbport,
  user     : config.dbuser,
  password : config.dbpass,
  database : config.database,
  socketPath  : config.dbsocket
});

connection.connect();

var createUnits = "CREATE TABLE units (unit_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"+
  "unit_name VARCHAR(255));";

var createUnitLocations = "CREATE TABLE unit_locations (location_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"+
  "unit_id INT,"+
  "date DATE,"+
  "lat VARCHAR(30),"+
  "lng VARCHAR(30));";

var createUnitRelations = "CREATE TABLE unit_relations (relation_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"+
  "unit_id INT,"+
  "parent_unit_id INT,"+
  "start_date DATE,"+
  "end_date DATE);";

connection.query(createUnits, function(err, rows, fields) {
  if (err) throw err;

  console.log('Created table units ');
  callback();
});

connection.query(createUnitLocations, function(err, rows, fields) {
  if (err) throw err;

  console.log('Created table unit_locations');
  callback();
});

connection.query(createUnitRelations, function(err, rows, fields) {
  if (err) throw err;

  console.log('Created table unit_relations');
  callback();
});

var calls = 0;
function callback() {
	calls++;
	if(calls === 3) {
		console.log("\nInstallation successful!\nYou can now start the server with \"node ww2maps-backend.js\"");		
		process.exit(0);
	}
}