module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/chai/chai.js',
      '/**/*.js',
      'app/**/*.js',
      'test/spec/*.js'
    ]
  });
};