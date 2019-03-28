
const initConfig = require('./initConfig'),
      listS3Buckets = require('./listS3Buckets'),
      hostStaticSite = require('./hostStaticSite');

module.exports = Object.assign({},
  initConfig,
  listS3Buckets,
  hostStaticSite
);