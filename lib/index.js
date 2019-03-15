"use strict";

const AWS = require("aws-sdk");

module.exports = {
  provider: "clevercloud-cellar",
  name: "Clever Cloud Cellar",
  auth: {
    host: {
      label: "Host",
      type: "text"
    },
    public: {
      label: "Key ID",
      type: "text"
    },
    private: {
      label: "Key Secret",
      type: "text"
    },
    bucket: {
      label: "Bucket",
      type: "text"
    }
  },
  init: config => {
    // configure AWS S3 bucket connection
    AWS.config.update({
      accessKeyId: config.public,
      secretAccessKey: config.private
    });

    const ep = new AWS.Endpoint(config.host);
    const S3 = new AWS.S3({
      endpoint: ep,
      signatureVersion: "v2",
      params: {
        Bucket: config.bucket
      }
    });

    return {
      upload: file => {
        return new Promise((resolve, reject) => {
          // upload file on S3 bucket
          const path = file.path ? `${file.path}/` : "";
          S3.upload(
            {
              Key: `${path}${file.hash}${file.ext}`,
              Body: Buffer.from(file.buffer, "binary"),
              ACL: "public-read",
              ContentType: file.mime
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              // set the bucket file url
              file.url = data.Location;

              resolve();
            }
          );
        });
      },
      delete: file => {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : "";
          S3.deleteObject(
            {
              Key: `${path}${file.hash}${file.ext}`
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve();
            }
          );
        });
      }
    };
  }
};
