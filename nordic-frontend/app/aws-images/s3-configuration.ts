const { S3_ALBUM_NAME, AWS_BUCKET_NAME } = require( '../templates');

export const HREF = `https://${AWS_BUCKET_NAME}.s3.eu-west-2.amazonaws.com/`;

export const IMAGE_PREFIX = HREF + S3_ALBUM_NAME + "/";

export const ALBUM_PHOTO_KEY = encodeURIComponent(S3_ALBUM_NAME) + "/";
