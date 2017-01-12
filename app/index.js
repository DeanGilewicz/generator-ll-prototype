'use strict';

// YEOMAN MODULES
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

// CORE NODE MODULES - npm install --save [name of module]
// be sure to be in generator-[name] directory

// EXTERNAL NODE MODULES
// https://github.com/sindresorhus/chalk
var chalk = require('chalk');
// https://www.npmjs.com/package/mkdirp
var mkdirp = require('mkdirp');

// Yeoman generator - version 0.1.0
var llPrototype = yeoman.generators.Base.extend({

    // generate the .yo-rc.json file - save configuration and also the marker used to define a project root folder
    // this.config.save();

    initializing: function() {
        // have Yeoman greet the user
        this.log(yosay(
            chalk.green.bold('Welcome to the ll prototype generator! ') + chalk.white.bold('Let\'s get started...')
        ));
    },

    // Where you prompt users for options (where you'd call this.prompt())
    prompting: function () {

        // Wait to go on to the next function until this function has completed
        var done = this.async();

        // USER INPUT
        // Using Inquirer.js - comes with Yeoman
        // https://github.com/SBoudrias/Inquirer.js
        this.prompt(
            [{
                type: 'input',
                name: 'appName',
                message: 'What is your project\'s name?',
                default : this.appname
            }, {
                type: 'confirm',
                name: 'includeFoundation',
                message: 'Would you like me to include Foundation grid?',
                default: true
            }, {
                // only ask if not using foundation since foundation comes with jQuery
                type: 'confirm',
                name: 'includeJQuery',
                message: 'Would you like me to include jQuery?',
                default: true,
                when: function (answers) {
                    return answers.includeFoundation === false;
                }
            }, {
                // only ask if not using foundation since foundation comes with Modernizr
                type: 'confirm',
                name: 'includeModernizr',
                message: 'Would you like me to include Modernizr?',
                default: true,
                when: function (answers) {
                    return answers.includeFoundation === false;
                }
            },  {
                type: 'confirm',
                name: 'includeES6',
                message: 'Will you be using ES6?',
                default: true
            }],
        // store user answers from prompt questions
        function (userAnswers) {
            this.appName = userAnswers.appName;
            this.includeFoundation = userAnswers.includeFoundation;
            this.includeJQuery = userAnswers.includeJQuery;
            this.includeModernizr = userAnswers.includeModernizr;
            this.includeES6 = userAnswers.includeES6;
            
            // continue executing the next function
            done();
        }.bind(this));
    },

    // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    configuring: function() {
        // this.copy('_editorconfig', '.editorconfig');
    },

    // If the method name doesn't match a priority, it will be pushed to this group.
    default: function() {

        // Alert user
        this.log('\n');
        this.log(chalk.yellow('Creating directories...'));
        this.log('\n');

        // Create directories

        // app dir
        // user creates the folder and app is scaffolded inside

        // data dir
        mkdirp('data');
        
        // js dir
        mkdirp('scripts');

        // css dir
        mkdirp('styles');
        
        // handlbars partials dir
        mkdirp('partials');

        // handlebars templates dir
        mkdirp('templates');
        mkdirp('templates/about');

        // dist dir
        mkdirp('dist');
        mkdirp('dist/images');

    },

    // Where you write the generator specific files (routes, controllers, etc)
    writing: function() {

        // Alert user
        this.log('\n');
        this.log(chalk.cyan('Creating files...'));
        this.log('\n');

        // Create files
            // generators expose all file methods on this.fs, which is an instance of mem-fs editor
            // https://github.com/sboudrias/mem-fs-editor

        // root

        this.fs.copy(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore')
        )

        this.fs.copy(
            this.templatePath('_humans.txt'),
            this.destinationPath('humans.txt')
        )

        this.fs.copy(
            this.templatePath('_robots.txt'),
            this.destinationPath('robots.txt')
        )

        this.fs.copy(
            this.templatePath('_README.md'),
            this.destinationPath('README.md')
        )

        this.fs.copy(
            this.templatePath('_.bowerrc'),
            this.destinationPath('.bowerrc')
        )

        this.fs.copy(
            this.templatePath('_.jshintrc'),
            this.destinationPath('.jshintrc')
        )

        // /data

        this.fs.copy(
            this.templatePath('_data.json'),
            this.destinationPath('data/data.json')
        )

        // /scripts

        this.fs.copy(
            this.templatePath('_main.js'),
            this.destinationPath('scripts/main.js')
        )
        
        // /styles/sass

        this.fs.copy(
            this.templatePath('_header.scss'),
            this.destinationPath('styles/sass/_header.scss')
        )

        this.fs.copy(
            this.templatePath('_footer.scss'),
            this.destinationPath('styles/sass/_footer.scss')
        )

        this.fs.copy(
            this.templatePath('_global.scss'),
            this.destinationPath('styles/sass/_global.scss')
        )

        this.fs.copy(
            this.templatePath('_index.scss'),
            this.destinationPath('styles/sass/_index.scss')
        )

        this.fs.copy(
            this.templatePath('_about.scss'),
            this.destinationPath('styles/sass/about/_index.scss')
        )

        // /templates/about

        this.fs.copy(
            this.templatePath('_about.hbs'),
            this.destinationPath('templates/about/index.hbs')
        )

        // /dist

        this.fs.copy(
            this.templatePath('_.htaccess'),
            this.destinationPath('dist/.htaccess')
        )

        this.fs.copy(
            this.templatePath('_favicon.ico'),
            this.destinationPath('dist/favicon.ico')
        )

        this.fs.copy(
            this.templatePath('_apple-touch-icon.png'),
            this.destinationPath('dist/images/apple-touch-icon.png')
        )

        // /dist/js/vendor

        this.fs.copy(
            this.templatePath('_console.js'),
            this.destinationPath('dist/js/vendor/console.js')
        )

            // no base modernizr file in v3+

        if(!this.includeFoundation && this.includeModernizr) {

            this.fs.copy(
                this.templatePath('_modernizr.js'),
                this.destinationPath('dist/js/vendor/modernizr.min.js')
            )
        }

        // Store user input and variables and use them to render the templates
        
        var context = {
            project_name: this.appName,
            includeFoundation: this.includeFoundation,
            includeNormalize: this.includeNormalize,
            includeModernizr: this.includeModernizr,
            includeJQuery: this.includeJQuery,
            includeES6: this.includeES6
        };

        // root

        this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'),
            context
        );

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            context
        );

        this.fs.copyTpl(
            this.templatePath('_gulpfile.js'),
            this.destinationPath('Gulpfile.js'),
            context
        );
        
        // /styles/sass

        this.fs.copyTpl(
            this.templatePath('_main.scss'),
            this.destinationPath('styles/sass/main.scss'),
            context
        );

        // /templates

        this.fs.copyTpl(
            this.templatePath('_index.hbs'),
            this.destinationPath('templates/index.hbs'),
            context
        );

        // /partials

        this.fs.copyTpl(
            this.templatePath('_head.hbs'),
            this.destinationPath('partials/head.hbs'),
            context
        );

        this.fs.copyTpl(
            this.templatePath('_head-includes.hbs'),
            this.destinationPath('partials/head-includes.hbs'),
            context
        );

        this.fs.copyTpl(
            this.templatePath('_footer.hbs'),
            this.destinationPath('partials/footer.hbs'),
            context
        );

        this.fs.copyTpl(
            this.templatePath('_footer-includes.hbs'),
            this.destinationPath('partials/footer-includes.hbs'),
            context
        );
    },

    // Where conflicts are handled (used internally)
    conflicts: function () {

    },

    // Where installations are run (npm, bower)
    install: function () {

        var self = this;

        // install dependencies into bower.json file

        if (this.includeFoundation) {
            this.bowerInstall(['foundation'], { 'save': true });
        }

        if (this.includeJQuery) {
            this.bowerInstall(['jquery'], { 'save': true });
        }

        this.bowerInstall(['normalize-scss'], function () {
            self.log(chalk.yellow('\n Bower packages installed, now installing node modules...\n'));
        });

        // install _package.json dependencies into package.json file

        this.npmInstall();

        // run gulp build task once scaffold complete
        this.on('end', function () {

            this.spawnCommand('gulp', ['build']);

        });
 
    },

    // Called last, cleanup, say good bye, etc
    end: function () {

        this.log(chalk.green('\n Node modules installed...\n'));

    }

});

module.exports = llPrototype;

