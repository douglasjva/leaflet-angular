module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher',
        'karma-spec-reporter'
    ],
    reporters: ['spec'],
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
        './bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        './bower_components/leaflet/dist/leaflet-src.js',
        './src/module.js',
        './src/**/*.js',
        './test/unit/**/*.js'
    ]
  })
}