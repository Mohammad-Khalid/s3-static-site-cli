
const listS3Buckets = async (profile) => {
    const AWS = await require('./client')(profile);

    const S3 = new AWS.S3({apiVersion: '2006-03-01'});
  
   // getting list of assistant

   return new Promise((resolve, reject) =>{
        S3.listBuckets((err, data) =>{
            if(err){
                reject(err);
            }else{

                resolve(data);
            }
        });
   });
  }
  
  module.exports = {listS3Buckets};