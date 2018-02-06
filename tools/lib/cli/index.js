#!/usr/bin/env node

import program from 'commander';
import colorful from 'colorful';

import packageInfo from '../../../package.json';

colorful.colorful();

program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task')
  .parse(process.argv);

// https://github.com/tj/commander.js/pull/260
const proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

const subCmd = program.args[0];
if (!subCmd || subCmd !== 'run') {
  program.help();
}
