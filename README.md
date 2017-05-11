## Thank you for checking out my Yeoman generator.

To use this generator, please ensure you have installed Yeoman globally on your machine, npm install -g yo. Visit http://yeoman.io/ for more details.


### Installation & Usage

To install: 

install this generator globally on your machine 

npm install -g generator-ll-prototype


To update:

npm update -g generator-ll-prototype


To check current version:

npm list -g  generator-ll-prototype


To use: 

This is used like any other Yeoman generator. Navigate to your new project folder and run:

yo ll-prototype


### Options

1) Include Foundation Grid (custom grid build)
2) Include jQuery
3) Include Modernizr (HTML5 Shiv)
4) Include ES6


### Project Structure

[project_name]
	-> .sass-cache/
	-> bower_components/
	-> data/
	-> dist/
	-> node_modules/
	-> partials/
	-> scripts/
	-> styles/
	-> templates/
	.bowerrc
	.gitignore
	.jshintrc
	bower.json
	Gulpfile.js
	humans.txt
	package.json
	README.md
	robots.txt

** sass-cache

- makes compiling faster
- Sass caches parsed documents so that they can be reused without parsing them again unless they have changed
- git ignored

** bower_components/

- location where bower writes dependencies that our generator needs
- this will also be the location where bower writes tools / libraries to should user choose to add anything additional
- git ignored
- jQuery ... copied to dist/js/vendor/
- normalize-scss ... imported into /styles/sass/main.scss

** data/

- json file used in gulp-compile-handlebars plugin
- allows data to be accessible throughout handlebars templates and partials

** dist/

- compiled folder to deploy

** node_modules/

- location where npm writes dependencies that our generator needs
- this will also be the location where npm writes tools / libraries to should user choose to add anything additional
- git ignored

** partials/

- handlebars partials that are available throughout project
- used in gulp-compile-handlebars plugin

** scripts/

- where user js is written

** styles/

- where user scss is written

** templates/

- handlebars templates that are available throughout project


### Gulp

Please see comments in gulpfile.js for more information but basically Gulp will:

- create a dist folder for deployment

- lint and minify js

- transpile ES6 to ES5 if option chosen

- move vendor js

- compile and minify sass

- compile handlebars templates (and partials) into .html files

- watch for any changes

- fires up a server so can view project locally at localhost:4000

- includes livereload to increase productivity


