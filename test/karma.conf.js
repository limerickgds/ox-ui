const path = require('path');

module.exports = function(config) {

  const BASE_PATH = path.join(__dirname, '../');
  const BASE_DIST_PATH = path.join(__dirname, '../dist/');     // app dist files

  config.set({
    basePath: BASE_PATH,
    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher')
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      { pattern: 'test/karma-test-shim.js', included: true, watched: false },

      // transpiled application & spec code paths loaded via module imports
      { pattern: BASE_DIST_PATH + '**/*.js', included: false, watched: true },

      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: BASE_DIST_PATH + '**/*.html', included: false, watched: true },
      { pattern: BASE_DIST_PATH + '**/*.css', included: false, watched: true },

      // Paths for debugging with source maps in dev tools
      { pattern: BASE_DIST_PATH + '**/*.js.map', included: false, watched: false }
    ],

    exclude: [],
    preprocessors: {},
    reporters: ['progress'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}

