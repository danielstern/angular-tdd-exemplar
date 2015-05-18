module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
		/* brings in describe keyword*/
    frameworks: ['mocha'],
    files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/chai/chai.js',
			'bower_components/jquery/dist/jquery.js',
      '/**/*.js',
      'app/**/module.js',
      'app/**/*.js',
      'test/spec/**/*.js'
    ],
		preprocessors: {
			'app/**/*.js*':['coverage']
		},
		coverageReporter: {
			type: 'text'
		}
  });
};