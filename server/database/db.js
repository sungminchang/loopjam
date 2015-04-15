var Sequelize = require('sequelize');
var pg = require('pg');
var config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	port: config.port,
	dialect: config.dialect
});

//Check database if connection has been established
sequelize.authenticate().complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  });

//Sequelize already includes extra columns, including
	//Unique ID & Auto Increment
	//Created At/Updated At timestamps

//Create Users table with One to Many relationship with Tracks.
var Users = sequelize.define('Users', {
	username: {
		type: Sequelize.STRING,
		unique: true
	},
	token: Sequelize.STRING,
	user_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	password: Sequelize.STRING,
	salt: Sequelize.STRING,
	// token: Sequelize.STRING,
	email: Sequelize.STRING
});

//Create Tracks table with Many to One relationship with Users.
var Tracks = sequelize.define('Tracks', {
	trackname: Sequelize.STRING,
	//storage object for each track that contains the unique urls for each loopNode
	audioData: Sequelize.STRING
	//param for storing objects here
});

//Steps to get this to work:
	//Download Postgres.app for Mac
	//Applications/Postgres.app/Contents/Versions/9.4/bin/createuser -s postgres
	//http://stackoverflow.com/questions/15301826/psql-fatal-role-postgres-does-not-exist

//Create the Database in psql beforehand
//Sequelize automatically creates the tables for us

Users.sync();
Tracks.sync();

//Establish Table Relationships. Primary Keys automatically created.

Users.hasMany(Tracks);
// By default the foreign key for a belongsTo relation will be generated 
// from the target model name and the target primary key name.
Tracks.belongsTo(Users, {foreignKey: 'track_key'});

exports.Users = Users;
exports.Tracks = Tracks;
