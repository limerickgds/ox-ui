import { task } from 'gulp';
import * as path from 'path';
import { PROJECT_ROOT, SOURCE_ROOT, DIST_ROOT, SOURCE_SASS_SRC } from '../constants';
import { copyTask, sequenceTask, tsBuildTask, sassBuildTask, minifyCssTask, minifyHtmlTask, templateInlineTask } from '../utils';

task(':build:ts', tsBuildTask(SOURCE_ROOT));

task(':build:sass', sassBuildTask(SOURCE_SASS_SRC, DIST_ROOT));

task(':build:assets', copyTask([
  path.join(SOURCE_ROOT, '**/*.!(ts|tsx|spec.ts|scss)'),
  path.join(PROJECT_ROOT, 'README.md'),
  path.join(PROJECT_ROOT, 'LICENSE'),
], DIST_ROOT));

task(':build:minify:style', minifyCssTask(path.join(DIST_ROOT, '**/*.css'), DIST_ROOT));

task(':build:minify:template', minifyHtmlTask(path.join(DIST_ROOT, '**/*.html'), DIST_ROOT));

task(':build:minify', [':build:minify:style', ':build:minify:template']);

task(':build:template:inline', templateInlineTask(DIST_ROOT));

task('build', sequenceTask([':build:ts', ':build:sass', ':build:assets'], ':build:minify', ':build:template:inline'));
