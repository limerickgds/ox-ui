import { task } from 'gulp';
import { DIST_ROOT } from '../constants';
import { cleanTask } from '../utils';

task('clean', cleanTask(DIST_ROOT));
