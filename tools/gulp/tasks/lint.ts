import gulp = require('gulp');
import {execNodeTask} from '../utils';

gulp.task('lint', ['lint:ts', 'lint:style']);


gulp.task('lint:ts', execNodeTask('tslint', ['-c', 'tslint.json', 'src/**/*.ts']));

gulp.task('lint:style', execNodeTask(
  'stylelint', ['src/**/*.scss', '--config', '.stylelintrc.json', '--syntax', 'scss']
));

