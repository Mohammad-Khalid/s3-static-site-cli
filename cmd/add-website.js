
module.exports = async (args) => {

    const s3 = require('../lib/s3'),
          ora = require('ora');

    if (!args.hasOwnProperty('bucket')) {
        console.log(`The '--bucket' argument is required`)
        return
    }

    const spinner = await ora().start('Adding website to s3...')

    try {
        const profile = args.profile || "default",
              bucket = args.bucket;


        const siteUrl = await s3.addWebsite(profile, bucket);

        await spinner.stop();

        console.log(`Website added to S3 with site url '${siteUrl}'`);


    } catch (err) {
        spinner.stop()
        
        console.error(`ERROR: ${err}`)
    }
}