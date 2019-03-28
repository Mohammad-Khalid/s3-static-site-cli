const fs = require('fs'),
      path = require('path'),
      mime = require('mime');

const hostStaticSite = async (profile, bucketName, sitePath) => {
    
    const AWS = await require('./client')(profile);

    const S3 = new AWS.S3({apiVersion: '2006-03-01'});

    if (!fs.existsSync(sitePath)) {

        throw new Error(`The file ${sitePath} was not be found.`)
    }

   return await Promise.resolve()

   // check bucket existence
   .then(async () => {

        return S3.headBucket({
            Bucket : bucketName
        }).promise()
        .then((data) => {

            return true;
        }).catch((error) => {

            if (error.statusCode === 404) {
                return false;
              }
            throw error;
        })
   })

   // create bucket if not exist and delete objects if bucket exist
   .then( async (bucket) => {

        if(bucket){

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
        }
        else{

            await S3.createBucket({
                Bucket : bucketName,
                ACL : 'public-read'
            }).promise()
            .then((data) => {
            })
        }

       return bucket;
   })

   // put objects in bucket
   .then(async (bucket) => {

       const files = await fs.readdirSync(sitePath);
       if(files.length){

            const filelist = await walkSync(sitePath, []);
            if(filelist.length){

                for(const fileName of filelist){
                    const bucketPath = fileName.replace(/\\/g, "/").substring(sitePath.length+1);
                    let params = {Bucket: bucketName, Key: bucketPath,ACL: 'public-read',ContentType :mime.getType(fileName), Body: fs.readFileSync(fileName) };

                    await S3.putObject(params).promise()
                    .then(upload => {
                    })
                }
            }
       }
        return bucket;
   })

   //Setting up bucket CORS
   .then( async (bucket) => {

        const corsParams = {
            Bucket: bucketName, 
            CORSConfiguration: 
            {
                CORSRules: 
                [ 
                    { 
                        AllowedHeaders: [ 'Authorization' ],
                        AllowedMethods: [ 'POST', 'GET', 'PUT', 'DELETE', 'HEAD' ],
                        AllowedOrigins: [ '*' ],
                        ExposeHeaders: [],
                        MaxAgeSeconds: 3000 
                    } 
                ]
            }
        };

        await S3.putBucketCors(corsParams).promise()
        .then( cors => {
        });
        return bucket;
   })

   //Setting up bucket policy
   .then( async (bucket) => {

        const readOnlyAnonUserPolicy = {
            Statement: 
            [
                {
                    Sid: "AddPerm",
                    Effect: "Allow",
                    Principal: "*",
                    Action: ["s3:GetObject"],
                    Resource: [`arn:aws:s3:::${bucketName}/*`]
                }
            ]
        };

        const params = {
            Bucket: bucketName, 
            Policy: JSON.stringify(readOnlyAnonUserPolicy)
        }

        await S3.putBucketPolicy(params).promise()
        .then(policy => {
        });
        return bucket;
   })

   //Setting up website
   .then( async (bucket) => {

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
   })
  }
  
  var walkSync = function(dir, filelist) {

    fs.readdirSync(dir).forEach(function (name) {
        var filePath = path.join(dir, name);
        var stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
            filelist.push(filePath);
        } else if (stat.isDirectory()) {
            walkSync(filePath, filelist);
        }
    });
    return filelist;
  };
  module.exports = {hostStaticSite};