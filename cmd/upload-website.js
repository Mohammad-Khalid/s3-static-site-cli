
module.exports = async (args) => {

    const s3 = require('../lib/s3'),
          ora = require('ora'),
          path = require('path');

    if (!args.hasOwnProperty('bucket')) {
        console.log(`The '--bucket' argument is required`)
        return
    }
    if (!args.hasOwnProperty('dir')) {
        console.log(`The '--dir' argument is required`)
        return
    }

    const spinner = await ora().start('Hosting Static site on s3...')

    try {
        const profile = args.profile || "default",
              bucket = args.bucket,
              dirPath = args.dir,
              fullPath = `${path.resolve(dirPath)}`


        const siteUrl = await s3.uploadWebsite(profile, bucket, fullPath);

        await spinner.stop();

        console.log(`Static Site Hosted on S3 with site url '${siteUrl}'`);


    } catch (err) {
        spinner.stop()
        
        console.error(`ERROR: ${err}`)
    }
}