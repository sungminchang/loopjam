var BufferLoader = function(context, data, callback) {
  console.log('inside bufferLoader, about to modify context', context);
  
  this.context = context;

};

BufferLoader.prototype.loadBuffer = function(loopNode) {
  // Load buffer asynchronously
  var url = loopNode.get('url');
  console.log('About to load buffer of this url: ', url);
  var request = new XMLHttpRequest();
  request.open("GET", url, true);

  if(url.substr(url.length - 10) !== ".mp3Base64"){
    request.responseType = "arraybuffer";
  }

  var loader = this;

  request.onload = function() {

    var arrayBuf = request.response;
    if(url.substr(url.length - 10) === ".mp3Base64"){
      // The file uploaded in our Azure S3 server is in base64 format, so we decode it to arraybuffer here.
      arrayBuf = Base64Binary.decode(request.response.substr(22)).buffer;
    }
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      arrayBuf,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loopNode.set('buffer', buffer);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };

  request.onerror = function(data) {
    console.log('BufferLoader: XHR error', data);
  };

  request.send();
};






