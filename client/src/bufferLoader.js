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
  this.metronomeUrl = 'audio/metronome.mp3'
  this.onload = callback;
  this.bufferList = new Array();
  // Need to keep references to each of the sources
  this.sources = {};
  this.loadCount = 0;
  this.metronomeSet = false;

};

BufferLoader.prototype.loadBuffer = function(url, index, that) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  console.log('About to load buffer of this url: ', url);
    // if(url.substr(url.length - 10) === ".mp3Base64"){
    //   url = "https://loopjammin.blob.core.windows.net/loopnodes/" + url;
    // }

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
          if (!loader.metronomeSet) {
            loader.metronomeSet = true;
            that.set('metronomeBuffer', buffer);
          } else {
            loader.bufferList[index] = buffer;
            // var loopNodeDiv = $('.btn-play')[index].click();
          }

          // if (++loader.loadCount == loader.urlList.length)
            // loader.onload(loader.bufferList);
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

BufferLoader.prototype.load = function(that) {
  for (var i = 0; i < this.urlList.length; ++i) {
    this.loadBuffer(this.urlList[i], i, that);
  }
};

BufferLoader.prototype.loadMetronome = function(that) {
  this.loadBuffer(this.metronomeUrl, 0, that, true);
};

BufferLoader.prototype.update = function(url, index, that) {
  this.urlList[index] = url;
  this.loadBuffer(url, index, that);

};



