import { join } from 'path';

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');
export const DIST_ROOT = join(PROJECT_ROOT, 'dist');

export const SOURCE_TS_SRC = [`${SOURCE_ROOT}/{**/*,*}.ts`];
export const SOURCE_SASS_SRC = [`${SOURCE_ROOT}/{**/*,*}.scss`];

export const SASS_AUTOPREFIXER_OPTIONS = {
  browsers: [
    'last 2 versions',
    'not ie <= 10',
    'not ie_mob <= 10',
  ],
  cascade: false,
};

export const HTML_MINIFIER_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  caseSensitive: true,
  removeAttributeQuotes: false
};

// TODO: delete
export const INLINE_TEMPLATE_OPTIONS = {
  target: 'es5',
  useRelativePaths: true,
  removeLineBreaks: true,
  templateProcessor: function (path: string, ext: any, file: any, cb: Function) {
    cb(null, file);
  }
};

export const SERVER_PORT = 3000;

export const NPM_VENDOR_FILES = [
  '@angular', 'core-js/client', 'hammerjs', 'rxjs', 'systemjs/dist', 'zone.js/dist'
];
