
module.exports = async (args) => {

    const s3 = require('../lib/s3'),
          ora = require('ora');

    if (!args.hasOwnProperty('bucket')) {
        console.log(`The '--bucket' argument is required`)
        return
    }

    const spinner = await ora().start('Deleting website from s3...')

    try {
        const profile = args.profile || "default",
              bucket = args.bucket;


        const bucketName = await s3.deleteWebsite(profile, bucket);

        await spinner.stop();

        console.log(`Website deleted from S3 '${bucketName}' bucket!`);


    } catch (err) {
        spinner.stop()
        
        console.error(`ERROR: ${err}`)
    }
}