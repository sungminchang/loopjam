var dbinfo = require('./config.js');
var azure = require('azure-storage');

exports.blobService = azure.createBlobService(dbinfo.AZR_USERNAME, dbinfo.AZR_KEY, dbinfo.AZR_HOST);