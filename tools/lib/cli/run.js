#!/usr/bin/env node

import colorful from 'colorful';

import gulp from 'gulp';
import program from 'commander';

colorful.colorful();

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
});

program.parse(process.argv);

const task = program.args[0];

if (!task) {
  program.help();
} else {
  console.log('run', task);

  require('../../gulpfile');

  gulp.start(task);
}
