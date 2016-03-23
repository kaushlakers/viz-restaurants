var gulp = require('gulp')
//var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
// requires browserify and vinyl-source-stream
var browserify = require('browserify')
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify')

var source = require('vinyl-source-stream')
var fs = require('fs');
gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 4000
    })
})

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/app.js')
    	.transform(require('browserify-css'), {
	        
	        onFlush: function(options, done) {
	            fs.writeFileSync('./public/css/bundle.css', options.data);
	            
	            // Do not embed CSS into a JavaScript bundle 
	            done(null);
        	}
    	})
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
})


gulp.task('watch', function() {
    gulp.watch('app/**/*.*', ['browserify'])
})


gulp.task('default', ['browserify', 'connect', 'watch'])