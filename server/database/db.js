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
	password: Sequelize.STRING,
	salt: Sequelize.STRING,
	// token: Sequelize.STRING,
	email: Sequelize.STRING
});

//Create Tracks table with Many to One relationship with Users.
var Tracks = sequelize.define('Tracks', {
	trackname: Sequelize.STRING,
	//storage object for each track that contains the unique urls for each loopNode
	audioData: Sequelize.TEXT,
	//param for storing objects here
});

//Create the Database in psql beforehand
//Sequelize automatically creates the tables for us

//Drop tables on refresh of server
sequelize.sync({force:true});

// Users.sync();
// Tracks.sync();

//Establish Table Relationships. Primary Keys automatically created.

Users.hasMany(Tracks);
// By default the foreign key for a belongsTo relation will be generated 
// from the target model name and the target primary key name.
Tracks.belongsTo(Users);

exports.Users = Users;
exports.Tracks = Tracks;
