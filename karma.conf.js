//Refer to http://karma-runner.github.io/0.8/config/configuration-file.html for more documentation.
module.exports = function (config){
  config.set({
  // Base path, that will be used to resolve all relative paths defined in files and exclude
  basePath: '',
  //Testing frameworks to use
  frameworks: ['jasmine','chai','mocha'],
  //List of files to load
  files: [
  'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js',
  'https://code.jquery.com/jquery-2.1.3.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.2/handlebars.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js'

  'test/test.js',
  ],
  //set the port number
  port: 1337,
  // List of files/patterns to exclude from loaded files.
  exclude: [],
  //Enable or disable watching files and executing the tests whenever one of these files changes.
  autoWatch: false,
  //Possible Values
    // Chrome
    // ChromeCanary
    // Firefox
    // Opera
    // Safari
    // PhantomJS
  browsers : ['Chrome'],
  //List of reporters to use
  reporters: ['progress'],

  singleRun: true,

  plugins : [
            'karma-junit-reporter',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-chai',
            'karma-mocha'
            ],
  });
}