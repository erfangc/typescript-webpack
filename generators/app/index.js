'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(`Welcome to the ${chalk.red('typescript / webpack')} generator!`));

        var prompts = [{
            type: 'input',
            name: 'appname',
            message: 'Enter a name for your App',
            default: _.kebabCase(this.appname)
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
            this.templatePath('test/jasmine/index.spec.ts'),
            this.destinationPath('test/index.spec.ts')
        );
    },

    install: function () {
        var devDependencies = ["jasmine", "karma-jasmine", "karma", "karma-chrome-launcher", "karma-webpack", "ts-loader", "typescript", "typings", "webpack"];
        this.npmInstall(devDependencies, {"saveDev": true});
        this.installDependencies();
        this.spawnCommand('typings', ['install']);
    }
});
