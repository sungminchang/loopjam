//Refer to http://karma-runner.github.io/0.8/config/configuration-file.html for more documentation.
module.exports = function (config){
  config.set({
  // Base path, that will be used to resolve all relative paths defined in files and exclude
  basePath: '',
  //Testing frameworks to use
  frameworks: ['jasmine','chai','mocha'],
  //List of files to load
  files: [
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
  browsers : ['PhantomJS'],
  //List of reporters to use
  reporters: ['progress'],

  plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-chai',
            'karma-mocha'
            ],
  });
}