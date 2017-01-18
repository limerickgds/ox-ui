import gulp = require('gulp');
import path = require('path');
import { PROJECT_ROOT } from '../constants';
import { sequenceTask } from '../utils';

const karma = require('karma');

gulp.task(':test:deps', sequenceTask(
  'clean',
  [
    ':build:assets',
    ':build:sass',
    ':build:spec',
  ]
));

gulp.task(':test:deps:inline', sequenceTask(':test:deps', ':build:template:inline'));

gulp.task('test', [':test:deps:inline'], (done: () => void) => {
  new karma.Server({
    configFile: path.join(PROJECT_ROOT, 'test/karma.conf.js'),
    singleRun: true
  }, done).start();
});

