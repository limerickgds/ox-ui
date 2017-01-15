import * as child_process from 'child_process';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gulpTypescript from 'gulp-typescript';
import * as path from 'path';

import { DIST_ROOT, SASS_AUTOPREFIXER_OPTIONS, HTML_MINIFIER_OPTIONS, INLINE_TEMPLATE_OPTIONS } from './constants';

const gulpClean = require('gulp-clean');
const gulpMerge = require('merge2');
const runSequence = require('run-sequence');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpConnect = require('gulp-connect');
const gulpJsonEditor = require('gulp-json-editor');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpSass = require('gulp-sass');
const gulpCleanCss = require('gulp-clean-css');
const gulpMinifyHtml = require('gulp-htmlmin');
const gulpInlineNg2Template = require('gulp-inline-ng2-template');
const resolveBin = require('resolve-bin');

export function cleanTask(glob: string) {
  return () => gulp.src(glob, { read: false }).pipe(gulpClean(null));
};

export function copyTask(src: string | string[], dest: string) {
  return () => gulp.src(src).pipe(gulp.dest(dest));
};

export function sequenceTask(...args: any[]) {
  return (done: any) => {
    runSequence(
      ...args,
      done
    );
  };
};

export function serverTask(port: Number = 3000, livereload: Boolean = true) {
  return () => {
    gulpConnect.server({
      root: DIST_ROOT,
      livereload: livereload,
      port: port,
      fallback: 'dist/index.html'
    });
  };
};

export function tsBuildTask(tsConfigPath: string, tsConfigName = 'tsconfig.json') {
  let tsConfigDir = tsConfigPath;
  if (fs.existsSync(path.join(tsConfigDir, tsConfigName))) {
    tsConfigPath = path.join(tsConfigDir, tsConfigName);
  } else {
    tsConfigDir = path.dirname(tsConfigDir);
  }
  return () => {
    const tsConfig: any = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
    const dest: string = path.join(tsConfigDir, tsConfig['compilerOptions']['outDir']);
    const tsProject = gulpTypescript.createProject(tsConfigPath);

    const tsResult = tsProject.src()
      .pipe(gulpSourcemaps.init())
      .pipe(tsProject());

    return gulpMerge([
      tsResult.dts.pipe(gulp.dest(dest)),
      tsResult.pipe(gulpSourcemaps.write('.')).pipe(gulp.dest(dest))
    ]);
  };
};

export function sassBuildTask(src: string | Array<string>, dest: string) {
  return () => {
    return gulp.src(src)
      .pipe(gulpSourcemaps.init())
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulpAutoprefixer(SASS_AUTOPREFIXER_OPTIONS))
      .pipe(gulpSourcemaps.write('.'))
      .pipe(gulp.dest(dest));
  };
};

export function minifyCssTask(src: string | Array<string>, dest: string) {
  return () => {
    return gulp.src(src)
      .pipe(gulpCleanCss())
      .pipe(gulp.dest(dest));
  };
};

export function minifyHtmlTask(src: string | Array<string>, dest: string) {
  return () => {
    return gulp.src(src)
      .pipe(gulpMinifyHtml(HTML_MINIFIER_OPTIONS))
      .pipe(gulp.dest(dest));
  };
};

export function templateInlineTask(glob: string) {
  const src = path.join(glob, '**/*.js');

  return () => {
    return gulp.src(src)
      .pipe(gulpInlineNg2Template(INLINE_TEMPLATE_OPTIONS))
      .pipe(gulp.dest(glob));
  };
};

export interface ExecTaskOptions {
  silent?: boolean;
  errMessage?: string;
};

export function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}) {
  return (done: (err?: string) => void) => {
    const childProcess = child_process.spawn(binPath, args);

    if (!options.silent) {
      childProcess.stdout.on('data', (data: string) => {
        process.stdout.write(data);
      });

      childProcess.stderr.on('data', (data: string) => {
        process.stderr.write(data);
      });
    }

    childProcess.on('close', (code: number) => {
      if (code !== 0) {
        if (options.errMessage === undefined) {
          done('Process failed with code ' + code);
        } else {
          done(options.errMessage);
        }
      } else {
        done();
      }
    });
  };
};

export function execNodeTask(packageName: string, executable: string | string[], args?: string[], options: ExecTaskOptions = {}) {
  if (!args) {
    args = <string[]>executable;
    executable = undefined;
  }

  return (done: (err: any) => void) => {
    resolveBin(packageName, { executable: executable }, (err: any, binPath: string) => {
      if (err) {
        done(err);
      } else {
        execTask('node', [binPath].concat(args), options)(done);
      }
    });
  };
};

export type EditorJsonTaskFunction = (json: any) => any;

export function editorJsonTask(filePath: string, editor: any | EditorJsonTaskFunction) {
  return () => gulp.src(filePath).pipe(gulpJsonEditor(editor)).pipe(gulp.dest(DIST_ROOT));
};
