module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/chai/chai.js',
			'bower_components/jquery/dist/jquery.js',
      '/**/*.js',
      'app/**/module.js',
      'app/**/*.js',
      'test/spec/*.js'
    ],
		reporters:['spec'],
		preprocessors: {
			'app/scripts/**/*.js*':['coverage']
		}
  });
};