/*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity; //get full stacktrace output

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {};

const distPath = '/base';

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return path.slice(-8) == '.spec.js';
}

function isMaterialFile(path) {
  return isJsFile(path) && path.indexOf('vendor') == -1;
}

const allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isMaterialFile);

// Load our SystemJS configuration.
System.config({
  baseURL: distPath
});

System.import(distPath + '/dist/system.config.spec.js').then(function () {
  // Load and configure the TestComponentBuilder.
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ]).then(function (providers) {
    var coreTesting = providers[0];
    var browserTesting = providers[1];

    coreTesting.TestBed.initTestEnvironment(
      browserTesting.BrowserDynamicTestingModule,
      browserTesting.platformBrowserDynamicTesting());
  });
}).then(function () {
  // Import all spec files and start karma.
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName).then(function (module) {
        return module;
      });
    }));
}).then(__karma__.start, __karma__.error);