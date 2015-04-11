var BufferLoader = function(context, data, callback) {
  console.log('inside bufferLoader, about to modify context', context);
  
  var urls = [];
  // Convert the data object into a list of url's as strings
  for (var i = 0; i < data.length; i++) {
    urls.push(data[i]);
  }
  console.log('urls: ', urls);

  this.context = context;
  this.urlList = urls;
  this.onload = callback;
  this.bufferList = new Array();
  // Need to keep references to each of the sources
  this.sources = {};
  this.loadCount = 0;

};

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  console.log('About to load buffer of this url: ', url);
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;

        // if (++loader.loadCount == loader.urlList.length)
          // loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  };

  request.send();
};

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i) {
    this.loadBuffer(this.urlList[i], i);
  }
};



