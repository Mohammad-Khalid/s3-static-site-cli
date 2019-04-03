const deleteWebsite = async (profile, bucketName) => {
    
    const AWS = await require('./client')(profile);

    const S3 = new AWS.S3({apiVersion: '2006-03-01'});

   return await Promise.resolve()

   .then(async () => {

        const params = {
            Bucket : bucketName
        }

        await S3.deleteBucketWebsite(params).promise()
        .then(data =>{
        });

        return bucketName;
   })
   .catch((error) => {

        throw error;
   });
}

module.exports = {deleteWebsite}