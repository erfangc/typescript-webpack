var webpackConfig = require("./webpack.config.js");
delete webpackConfig.entry; // no need for entry, test files are the entry points

module.exports = function (config) {
    config.set({

        frameworks: ['jasmine'],

        files: [
            // all files ending in "_test"
            'test/*.spec.ts',
            'test/**/*.spec.ts'
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'test/*.spec.ts': ['webpack'],
            'test/**/*.spec.ts': ['webpack']
        },

        webpack: webpackConfig,

        browsers: ["Chrome"]
    });
};
