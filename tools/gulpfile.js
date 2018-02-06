import path from 'path';
import fs from 'fs-extra';
import gulp from 'gulp';
import less from 'gulp-less';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import glob from 'glob';
import through2 from 'through2';
import gutil from 'gulp-util';
import rimraf from 'rimraf';
import chalk from 'chalk';
import runSequence from 'run-sequence';
import lessToJs from 'less-vars-to-js';

// 路径
const ROOT_DIR = process.cwd();
// const ANTD_DIR = path.join(ROOT_DIR, 'vendor/antd');
const ANTD_DIR = path.join(ROOT_DIR, 'node_modules/antd');
const SELF_ANTD_DIR = path.join(ROOT_DIR);
const SELF_COMPONENT_DIR = path.join(ROOT_DIR, 'components/lib');
const UTILS_DIR = path.join(ROOT_DIR, 'utils');

const runCmd = require('./lib/runCmd');

const themer = lessToJs(fs.readFileSync(path.join(ROOT_DIR, './components/nanoReset.less'), 'utf8'));

gulp.task('clean-all', () => {
  console.log(`${chalk.bgMagenta('[clean /dist & /lib]')}`);
  rimraf.sync(path.join(ROOT_DIR, './lib'));
  rimraf.sync(path.join(ROOT_DIR, './dist'));
});

function antdCompile(done) {
  process.chdir(ANTD_DIR);
  runCmd('npm', ['run', 'compile'], () => {
    process.chdir(ROOT_DIR);
    done();
  });
}

function antdDist(done) {
  process.chdir(ANTD_DIR);
  runCmd('node', [path.join('./scripts/prepub')], () => {
    process.chdir(ROOT_DIR);
    done();
  });
}

function fsExistsSync(dir) {
  try {
    fs.accessSync(dir, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

function isFile(dir) {
  try {
    return fs.statSync(dir).isFile();
  } catch (e) {
    return false;
  }
}

/**
 * antd快捷方式模板
 * @param component
 * @returns {TPL}
 */
function getTPL(component) {
  const fromDir = path.join(SELF_ANTD_DIR, 'node_modules/');
  const toDir = path.join(ANTD_DIR, 'lib/', component);
  return `module.exports = require('${path.relative(fromDir, toDir)}');`;
}

/**
 * 编译antd
 */
gulp.task('antd-complie', (done) => {
  console.log(`${chalk.bgMagenta('[complie antd start...]')}`);
  antdCompile(done);
});

/**
 * 打包antd
 */
gulp.task('antd-dist', (done) => {
  console.log(`${chalk.bgMagenta('[dist antd start...]')}`);
  antdDist(done);
});

gulp.task('copy-antd', () => {
  const reg = /_util|style|locale-provider/;
  const antdLib = path.join(ANTD_DIR, 'lib');
  const dirList = fs.readdirSync(antdLib);
  dirList.forEach((item) => {
    const componentStyleDir = path.join(ANTD_DIR, `lib/${item}/style`);
    console.log(`${chalk.bgMagenta('[copy antd]')} ${chalk.cyan(item)}`);
    // 复制 _util/ & style/ & locale-provider/ index.js
    if (reg.test(item) || isFile(path.join(ANTD_DIR, `lib/${item}`))) {
      fs.copySync(path.join(ANTD_DIR, `lib/${item}`), path.join(SELF_ANTD_DIR, `lib/${item}`));
    }
    if (item === '_util') {
      gulp.src([path.join(UTILS_DIR, '/**')]).pipe(babel()).pipe(gulp.dest(path.join(SELF_ANTD_DIR, `lib/${item}`)));
    }
    if (fsExistsSync(componentStyleDir)) {
      const outputFile = path.join(SELF_ANTD_DIR, `lib/${item}/index.js`);
      if (fsExistsSync(path.join(ANTD_DIR, `lib/${item}/style`))) {
        fs.copySync(path.join(ANTD_DIR, `lib/${item}/style`), path.join(SELF_ANTD_DIR, `lib/${item}/style`));
      }
      if (fsExistsSync(path.join(ANTD_DIR, `lib/${item}/locale`))) {
        fs.copySync(path.join(ANTD_DIR, `lib/${item}/locale`), path.join(SELF_ANTD_DIR, `lib/${item}/locale`));
      }
      fs.outputFileSync(outputFile, getTPL(item));
    }
  });
});

/**
 * 编译自有组件
 */
gulp.task('compile', () => (
  gulp.src([path.join(SELF_COMPONENT_DIR, '**/index.js'), `!${SELF_COMPONENT_DIR}/**/style/**`])
    .pipe(babel())
    .pipe(through2.obj(function (file, encoding, next) {
      console.log(`${chalk.bgMagenta('[compile]')} ${chalk.cyan(file.path)}`);
      const self = this;
      const fileDir = path.resolve(file.path, '../**');
      // file.path = file.path.replace(/index.js$/, '.css');
      self.push(file.clone());
      glob.sync(fileDir, {}).forEach((dir) => {
        if (isFile(dir)) {
          let replacePath = dir;
          // 替换index.js -> index.d.js
          if (replacePath === file.path) {
            replacePath = dir.replace(/index.js$/, 'index.d.js');
          }
          self.push(new gutil.File({
            cwd: ROOT_DIR,
            base: SELF_COMPONENT_DIR,
            path: replacePath,
            contents: fs.readFileSync(dir),
          }));
        }
      });
      next();
    }))
    .pipe(gulp.dest('./lib/'))
));

gulp.task('compile-entry', () => {

});

/**
 * 清除自有组件
 */
gulp.task('clean', () => {
  fs.readdirSync(SELF_COMPONENT_DIR).forEach((dir) => {
    console.log(`${chalk.bgMagenta('[clean]')} ${chalk.cyan(dir)}`);
    rimraf.sync(path.join(ROOT_DIR, 'lib/', dir));
  });
});

gulp.task('less', () => (
  gulp.src(path.join(SELF_ANTD_DIR, '/lib/**/style/index.less'))
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      sourceMap: true,
      modifyVars: themer,
    }))
    .pipe(gulp.dest((file) => {
      console.log(`${chalk.bgMagenta('[less]')} ${chalk.cyan(file.path)}`);
      return file.base;
    }))
));

gulp.task('sass', () => (
  gulp.src(path.join(SELF_COMPONENT_DIR, '**/style/index.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest((file) => {
      console.log(`${chalk.bgMagenta('[sass]')} ${chalk.cyan(file.path)}`);
      return file.base;
    }))
));

gulp.task('build-components', (done) => {
  runSequence(
    'clean',
    'sass',
    'compile',
    done
  );
});

gulp.task('dist', (done) => {
  runCmd('aimake', ['build'], () => {
    done();
  });
});

gulp.task('copy-index', () => (
  gulp.src(path.join(ROOT_DIR, '/index.js'))
    .pipe(babel())
    .pipe(gulp.dest('./lib/'))
));

gulp.task('build', (done) => {
  runSequence(
    'init-antd',
    'build-components',
    'dist',
    // 'copy-index',
    done
  );
});

gulp.task('init-antd', (done) => {
  runSequence(
    'clean-all',
    'copy-antd',
    'less',
    done
  );
});

/**
 * vendor 需编译版本
 */
gulp.task('init-antd-2', (done) => {
  runSequence(
    'clean-all',
    'antd-complie',
    'antd-dist',
    'copy-antd',
    'less',
    done
  );
});
