const ora = require('ora');

const s3 = require('../lib/s3');

module.exports = async (args) => {

  if (args.hasOwnProperty('profile') && args.profile === true) {
    console.log(`The '--profile <profile>' arguments are required`)
    return
  }
  const spinner = ora().start()

  try {
    
    s3.initConfig(args);

    spinner.stop()

    //TODO: implement init command


  } catch (err) {
    spinner.stop()
    
    console.error(err)
  }
}