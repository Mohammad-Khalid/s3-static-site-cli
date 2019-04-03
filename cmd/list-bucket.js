const s3 = require('../lib/s3');
const ora = require('ora');

module.exports = async (args) => {

  const spinner = await ora().start('Getting s3 buckets...\n')

  try {
    const profile = args.profile || "default";
    const buckets = await s3.listBucket(profile);

    await spinner.stop();
    
    for( let i = 0 ; i < buckets.Buckets.length ; i++){
        console.log(`${buckets.Buckets[i].Name}`)
    }


  } catch (err) {
    spinner.stop()
    
    console.error(`ERROR: ${err}`)
  }
}