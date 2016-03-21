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
        }, {
            type: 'list',
            name: 'testFramework',
            message: 'Choose a testing framework',
            choices: ['mocha', 'jasmine'],
            default: 'mocha'
        }, {
            type: 'list',
            name: 'browser',
            message: 'Choose a browser for Karma',
            choices: ['chrome', 'phantomjs'],
            default: 'phantomjs'
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // resolve Karma browsers name
            if (props.browser === 'phantomjs')
                this.props.browserFriendlyName = 'PhantomJS';
            else
                this.props.browserFriendlyName = 'Chrome';

            done();
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath('*.js'),
            this.destinationRoot(),
            this.props
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
            this.templatePath(`test/${this.props.testFramework}/index.spec.ts`),
            this.destinationPath('test/index.spec.ts')
        );
    },

    install: function () {

        var dependencies = ["lodash"];
        var devDependencies = [`${this.props.testFramework}`, `karma-${this.props.testFramework}`, "karma", "karma-webpack", "ts-loader", "typescript", "typings", "webpack"];
        if (this.props.browser === "phantomjs") {
            devDependencies.push("phantomjs");
            devDependencies.push("karma-phantomjs-launcher@0.2.3")
        } else
            devDependencies.push("karma-chrome-launcher");

        this.npmInstall(devDependencies, {"saveDev": true});
        this.npmInstall(dependencies, {"save": true});
        this.installDependencies();

        this.spawnCommand('typings', ['install', 'lodash', this.props.testFramework, '--save', '--ambient']);

    }
});
