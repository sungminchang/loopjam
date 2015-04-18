var azure = require('azure-storage');
var azureconnection = require('./databaseConnection.js')

exports.createSharedAccess = function(arrayOfHashes){
  var result = [];

  for(var i = 0; i < arrayOfHashes.length; i++){
    var startDate = new Date();
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 100);
    startDate.setMinutes(startDate.getMinutes() - 100);

    var sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: azure.BlobUtilities.SharedAccessPermissions.WRITE,
        Start: startDate,
        Expiry: expiryDate
      },
    };

    // console.log(app)

    var token = azureconnection.blobService.generateSharedAccessSignature("loopnodes", arrayOfHashes[i], sharedAccessPolicy);
    var sasUrl = azureconnection.blobService.getUrl("loopnodes", arrayOfHashes[i], token);

    result.push(sasUrl);
  }

  console.log(result);
  return result;
}