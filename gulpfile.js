var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var karma = require('karma').server;
var liveServer = require('gulp-live-server');
var mocha = require('gulp-mocha');



gulp.task('test-server', function(done){
	/* start the server for the tests */
	var server = new liveServer('server.js');
	server.start();

	/* run server tests */
	gulp.src('test/server.spec.js',{read:false})
	.pipe(mocha({reporter:'nyan'}))
	.once('error',complete)
	.once('end',complete);
	
	/* stop the server */
	function complete(){
		done();
		server.stop();
	}
});

gulp.task('test-browser',function(done){
	/* run browser tests with karma */
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

/* test ALL THE THINGS */
gulp.task('test', ['test-server','test-browser']);

/* serve the app */
gulp.task('serve', function () {
	
	var server = new liveServer('server.js');
	server.start();
	
  browserSync({
    notify: false,
    port: 8080,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
		'test/spec/**/*.js',
		'server.js'
  ],['test',server.start])
	.on('change', reload);
});

/* Run the browser tests inside of Chrome. */
gulp.task('serve-test',function(){
	
	browserSync({
    notify: false,
    port: 8080,
    server: {
      baseDir: ['test','app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
	
	gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'test/spec/**/*.js'
  ]).on('change', reload);
});

/* Serve our app for development purposes. */
gulp.task('default',['serve']);
