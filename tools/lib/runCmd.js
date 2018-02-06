import childProcess from 'child_process';

import getRunCmdEnv from './utils/getRunCmdEnv';

function runCmd(cmd, _args, fn) {
  const args = _args || [];
  const runner = childProcess.spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
    env: getRunCmdEnv(),
  });

  runner.on('close', (code) => {
    if (fn) {
      fn(code);
    }
  });
}

module.exports = runCmd;
