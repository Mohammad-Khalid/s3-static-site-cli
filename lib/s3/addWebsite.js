const addWebsite = async (profile, bucketName) => {
    
    const AWS = await require('./client')(profile);

    const S3 = new AWS.S3({apiVersion: '2006-03-01'});

   return await Promise.resolve()

   .then(async () => {

        const staticHostParams = {
            Bucket: bucketName,
            WebsiteConfiguration: {
                ErrorDocument: {
                    Key: 'index.html'
                },
                IndexDocument: {
                    Suffix: 'index.html'
                }
            }
        };

        await S3.putBucketWebsite(staticHostParams).promise()
        .then(website => {
        })
        return `http://${bucketName}.s3-website-${AWS.config.credentials.region}.amazonaws.com`;
   })
   .catch((error) => {

        throw error;
   });
}

module.exports = {addWebsite}