
const initConfig = require('./initConfig'),
      listBucket = require('./listBuckets'),
      uploadWebsite = require('./uploadWebsite'),
      addWebsite = require('./addWebsite'),
      deleteWebsite = require('./deleteWebsite'),
      deleteBucket = require('./deleteBucket');

module.exports = Object.assign({},
  initConfig,
  listBucket,
  uploadWebsite,
  addWebsite,
  deleteWebsite,
  deleteBucket
);