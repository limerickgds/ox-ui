import { task } from 'gulp';
import { SERVER_PORT } from '../constants';
import { serverTask } from '../utils';

task('serve', serverTask(SERVER_PORT));
