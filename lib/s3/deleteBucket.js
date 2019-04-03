const deleteBucket = async (profile, bucketName) => {
    
    const AWS = await require('./client')(profile);

    const S3 = new AWS.S3({apiVersion: '2006-03-01'});

   return await Promise.resolve()

   .then(async () => {

          await S3.headBucket({
          Bucket : bucketName
          }).promise()
          .then(async (data) => {

               await S3.listObjects({
                    Bucket : bucketName
                }).promise()
                .then(async (data) => {
         
                     if(data.Contents.length){
    
                        let params = {
                            Bucket : bucketName,
                            Delete : {
                                Objects : []
                            }
                        };
    
                        for(let i = 0 ; i < data.Contents.length ; i ++){
    
                            params.Delete.Objects.push({
                                Key : data.Contents[i].Key
                            })
                        }
                        
                        
                        await S3.deleteObjects(params).promise()
                        .then((delBucket) => {
                        })
                     }
                })

               await S3.deleteBucket({
                    Bucket : bucketName
                }).promise()
               .then(data =>{
               });
          })
        

        return bucketName;
   })
   .catch((error) => {

        throw error;
   });
}

module.exports = {deleteBucket}