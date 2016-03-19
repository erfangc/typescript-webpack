'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the bee\'s knees ' + chalk.red('typescript / webpack') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'appname',
            message: 'Your app\'s name',
            default: this.appname
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            done();
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this.props
        );
        this.fs.copy(
            this.templatePath('*.js'),
            this.destinationRoot()
        );
        this.fs.copy(
            this.templatePath('typings.json'),
            this.destinationPath('typings.json')
        );
        this.fs.copy(
            this.templatePath('src/index.ts'),
            this.destinationPath('src/index.ts')
        );
        this.fs.copy(
            this.templatePath('test/index.spec.ts'),
            this.destinationPath('test/index.spec.ts')
        );
    },

    install: function () {
        this.installDependencies();
        this.spawnCommand('typings', ['install']);
    }
});
