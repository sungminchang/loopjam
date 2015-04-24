var Sequelize = require('sequelize');
var pg = require('pg');
var config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	port: config.port,
	dialect: config.dialect
});

var Users = sequelize.define('Users', {
	username: {
		type: Sequelize.STRING,
		unique: true
	},
	salt: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING
});

var Tracks = sequelize.define('Tracks', {
	trackname: Sequelize.STRING,
	audioData: Sequelize.TEXT,
  trackID: Sequelize.STRING
});

//Establish Table Relationships
Users.hasMany(Tracks);
Tracks.belongsTo(Users);
sequelize.sync({force:true});

//Check connection to database
sequelize.authenticate().complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  });

exports.Users = Users;
exports.Tracks = Tracks;
