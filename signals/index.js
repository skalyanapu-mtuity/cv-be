const process = require('process');
/**
 * To handle app intance wide process level 
 * signals
 * @param {*} closeFunc 
 */
const init = closeFunc => async () => {
  try {
    await closeFunc();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
};


module.exports = { init };
