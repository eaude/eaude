module.exports = {
  tumblr: {
    consumerKey: process.env.TUMBLR_CONSUMER_KEY
  },
  s3: {
    albumBucketName: process.env['S3_BUCKET_NAME'],
    bucketRegion: process.env['S3_REGION'],
    IdentityPoolId: process.env['S3_IDENTITY_POOL_ID']
  }
}
