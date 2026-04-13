/* eslint-disable */

module.exports = async function () {
  console.log(globalThis.__TEARDOWN_MESSAGE__);
  const child = (globalThis as any).__API_PROCESS__;
  if (child && !child.killed) {
    child.kill('SIGTERM');
  }
};
