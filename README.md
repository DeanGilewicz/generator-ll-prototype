## Thank you for checking out my Yeoman generator.

To use this generator, please ensure you have installed Yeoman globally on your machine, `npm install -g yo`. Visit http://yeoman.io/ for more details.


### Installation

* To install: 

	- `npm install -g generator-ll-prototype`


* To check current version:

	- `npm list -g generator-ll-prototype`


* To update:

	- `npm update -g generator-ll-prototype`


* Command Line:

	- open up your terminal, type `yo` and press enter
	- a Yeoman command line interface will provide options to view, install, and update your generators


### Usage

* To use:

	- using a terminal, create a new project folder
	- navigate to the new project folder 
	- inside of the new project folder run `yo ll-prototype`


### Generator Options

	- include Foundation Grid (custom grid build)
	- include jQuery
	- include Modernizr (HTML5 Shiv)
	- include ES6


### Project Structure

* sass-cache/

	- makes compiling faster
	- sass caches parsed documents so that they can be reused without parsing them again unless they have changed
	- git ignored

* assets/

	- fonts/ - put font files here
	- images/ - put image files here 

* bower_components/

	- location where bower writes dependencies for project
	- git ignored

* data/

	- json file used in gulp-compile-handlebars plugin
	- allows data to be accessible throughout handlebars templates and partials

* dist/

	- consists of all assets for deployment

* node_modules/

	- location where npm writes dependencies for project
	- git ignored

* partials/

	- handlebars partials that are included in handlebars templates in project
	- used in gulp-compile-handlebars plugin

* scripts/

	- project js is written here

* styles/

	- project scss is written here

* templates/

	- handlebars templates that will be converted to deployable html files


### Gulp

* please see comments in gulpfile.js for more information but basically Gulp will:

	- lint and minify js
	- transpile ES6 to ES5
	- compile and minify sass (scss)
	- compile handlebars templates (and partials) into .html files
	- watch files for any changes and run tasks when changes are made
	- fire up a server for local developmemt at localhost:4000 with livereload
	- create a dist folder for deployment


### Issues Updating Generator

* if still running old version after update:

	- may need to do a npm cache clean
	- run `npm cache clean`
	- run `npm update -g generator-ll-prototype`

* if still running old version after clear npm cache:

	- run `DEBUG=yeoman:* yo`
	- in the command line look for responses that begin with `yeoman:environment` and show the file path to the generator
	- navigate to that location and delete the generator folder
	- run `DEBUG=yeoman:* yo`
	- there should not be any responses listed now

* if still running old version after clear npm cache and debug:

	- uninstall generator by running `npm uninstall -g generator-ll-prototype`
	- reinstall generator by running `npm install -g generator-ll-prototype`

