module.exports = function (config){
  config.set({
  basePath: '',
  frameworks: ['jasmine'],
  files: [
  'client/src/*.js',
  ],
  autoWatch: false,
  browsers : ['Chrome', 'PhantomJS', 'Firefox'],
  reporters: ['progress'],
  plugins : [
        'karma-junit-reporter',
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-chai',
        'karma-phantomjs-launcher'
    ]
  });
}