module.exports = {
	database: process.env.database || 'loopjam',
	username: process.env.user || 'postgres',
	password: process.env.password || '',
	host: process.env.host || 'localhost',
	port: 5432,
	dialect: 'postgres'
};

//Download the SSH key
//cd into the directory where your key is
//RUN:
   //ssh -i ./loopjam.key loopjam@loopjammin.cloudapp.net -p22
   //sudo -u postgres psql postgres
   //       (username)(psql)(database)

//POSTGRES DATABASE CONFIG ON UBUNTU VM RUNNING ON AZURE
// sudo vi /etc/postgresql/9.1/main/pg_hba.conf
// sudo vi /etc/postgresql/9.1/main/postgresql.conf 
