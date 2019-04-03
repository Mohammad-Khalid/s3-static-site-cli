const assert = require('assert');
const expect = require('chai').expect;
const path = require('path');

const s3 = require("../lib/s3");

describe('S3 Bucket CLI Module Tests', () => {
  let profile = "default", bucketName = `aws-s3-cli-${Date.now()}`;
  before(() => {
    
  })
  after(() => {
  })
  describe('#uploadWebsite()', () => {
    it('Upload website on s3 bucket', async () => {
      let fullPath = `${path.resolve('test/Static-site-files/')}`
      url = await s3.uploadWebsite(profile, bucketName, fullPath);
      expect(url).to.include(`http://${bucketName}.s3-website-`);
    });
  });

  describe('#getBuckets()', () => {
    it('list buckets', async () => {
      const buckets = await s3.listBucket(profile);
      expect(buckets.Buckets.length).to.be.greaterThan(0, 'no buckets found');
    });
  });

  describe('#addWebsite()', () => {
    it('Add website to s3 bucket', async () => {
      url = await s3.addWebsite(profile, bucketName);
      expect(url).to.include(`http://${bucketName}.s3-website-`);
    });
  });

  describe('#deleteWebsite()', () => {
    it('Delete website from s3', async () => {
      bucket = await s3.deleteWebsite(profile, bucketName);
      expect(bucket).to.be.equal(bucketName);
    });
  });

  describe('#deleteBucket()', () => {
    it('Delete bucket from s3', async () => {
      bucket = await s3.deleteBucket(profile, bucketName);
      expect(bucket).to.be.equal(bucketName);
    });
  });
});