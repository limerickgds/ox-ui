import { task, src, dest } from 'gulp';
import * as path from 'path';
import { PROJECT_ROOT, SOURCE_ROOT, DIST_ROOT, SOURCE_SASS_SRC, ROLLUP_GLOBALS } from '../constants';
import { copyTask, sequenceTask, tsBuildTask, sassBuildTask, minifyCssTask, minifyHtmlTask, templateInlineTask } from '../utils';

const gulpRollup = require('gulp-better-rollup');

task(':build:ts', tsBuildTask(SOURCE_ROOT, 'tsconfig.build.json'));

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

task(':build:rollup', () => {

  const rollupOptions = {
    context: 'this',
    external: Object.keys(ROLLUP_GLOBALS)
  };

  const rollupGenerateOptions = {
    moduleId: '',
    moduleName: 'ox-ui',
    format: 'umd',
    globals: ROLLUP_GLOBALS,
    dest: 'ox-ui.umd.js'
  };

  return src(path.join(DIST_ROOT, 'index.js'))
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(dest(DIST_ROOT));
});

task('build', sequenceTask([':build:ts', ':build:sass', ':build:assets'], ':build:minify', ':build:template:inline', ':build:rollup'));
