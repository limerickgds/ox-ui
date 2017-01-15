import { task } from 'gulp';
import * as path from 'path';
import { PROJECT_ROOT } from '../constants';
import { editorJsonTask } from '../utils';

const PROJECT_PACKAGE = path.resolve(PROJECT_ROOT, './package.json');

task('release:package', editorJsonTask(PROJECT_PACKAGE, (json: any) => {
  const {name, author, version, description, keywords, repository, license, bugs, homepage, dependencies} = json;
  let packageJson = <any>{
    name,
    author,
    version,
    main: './ox-ui.umd.js',
    module: './index.js',
    typings: './index.d.ts',
    description,
    keywords,
    repository,
    license,
    bugs,
    homepage,
    dependencies
  };
  return packageJson;
}));

task('release', ['build', 'release:package']);
