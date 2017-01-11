var gulp = require('gulp'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	del = require('del'),
	fs = require('fs'),
	handlebars = require('gulp-compile-handlebars'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	postcss = require('gulp-postcss'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify');

	// data = require('./data/data.json');
	// json data for templates - require does cache the result making it unsuitable to read/modify/read-again otherwise have to continually restart gulp to see updates to data

// express server
	// view on host computer -> localhost:4000
	// view on mobile device -> in command line of computer run ifconfig, look for en0, en1 etc and "inet" number. Use this number plus port
	// e.g. 00.0.00.00:4000

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(express.static(__dirname + '/dist', {'extensions': ['html']})); // _dirname is the root - expects index.html at root - defined in dist folder
	app.listen(4000);
});


// JAVASCRIPT

	// lint main js file

gulp.task('jshint', function() {
	return gulp.src('scripts/main.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

	// minify main.js script - place into dist folder

gulp.task('minify-main-js', function() {
	return gulp.src('scripts/main.js')
		.pipe(sourcemaps.init())
		.pipe(uglify().on('error', function(e) {
			console.log(e.message);
			return this.end();
		}))
		.pipe(rename('main.min.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js'))
		.pipe(livereload());
});

	// place vendor js into dist folder
<% if (includeFoundation || includeJQuery) { %>
gulp.task('vendor-scripts', function() { <% if (includeFoundation) { %>
	return gulp.src(['bower_components/modernizr/modernizr.js',
  					'bower_components/fastclick/lib/fastclick.js',
  					'bower_components/jquery/dist/jquery.min.js' ]) <% } else if (includeJQuery) { %>
	return gulp.src('bower_components/jquery/dist/jquery.min.js') <% } %>
    .pipe(gulp.dest('dist/js/vendor'));
});
<% } %>

// SASS

	// compile sass into css and minify - place into dist folder

gulp.task('minify-css', function() {
	var processors = [
		autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
		cssnano
	];
	return gulp.src('styles/sass/main.scss')
		.pipe(sass({ outputStyle: 'expanded' })
			.on('error', sass.logError)
		)
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(rename('main.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/css'))
		.pipe(livereload());
});

// HANDLEBARS

	// make data and partials available in project
	// compile handlebars templates - place in dist as .html files

gulp.task('handlebars', function () {
	var data = JSON.parse(fs.readFileSync('data/data.json'));
	// var templateData = {}, // data to pass into templates - using ./data/data.json above
	options = {
		ignorePartials: true, // ignores any unknown partials. Useful if you only want to handle part of the file
		// partials : {}, // Javascript object that will fill in partials using strings
		batch : ['partials'] // Javascript array of filepaths to use as partials
		// helpers : {
		//     capitals : function(str){
		//         return str.toUpperCase();
		//     }
		// } // javascript functions to stand in for helpers used in the handlebars files
	};
	return gulp.src('templates/**/*.hbs')
		.pipe(handlebars(data, options)) // using ./data/data.json file
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(livereload())
});


// DELETE

	// remove all dist files when needed

gulp.task('clean', function() {
	del([
		'dist'
	]);
});


// GULP TASKS

	// watch directories / files and update when changes are made

gulp.task('watch', function() {
	livereload.listen({ quiet: true }); // disable console log of reloaded files
	gulp.watch(['styles/sass/**'], ['minify-css']);
	gulp.watch(['scripts/main.js'], ['jshint', 'minify-main-js']);
	gulp.watch(['templates/**'], ['handlebars']);
	gulp.watch(['partials/*.hbs'], ['handlebars']);
	gulp.watch(['data/data.json'], ['handlebars']);
});

	// register default gulp tasks

gulp.task('default', ['express', 'watch', 'jshint', 'minify-css', 'minify-main-js', 'handlebars'], function() {
	console.log('gulp is watching and will rebuild when changes are made...');
});

	// register initial gulp tasks

gulp.task('build', [<% if (includeFoundation || includeJQuery) { %>'vendor-scripts', <% } %>'minify-css', 'minify-main-js', 'handlebars'], function() {
	console.log('Your development environment has been set up. Run gulp to watch and build your project!');
});

