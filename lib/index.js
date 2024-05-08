"use strict";

const AWS = require("aws-sdk");
const zlib = require("zlib");
const { buffer } = require("node:stream/consumers");

module.exports = {
  init(config) {
    const ep = new AWS.Endpoint(config.host);
    const S3 = new AWS.S3({
      endpoint: ep,
      signatureVersion: "v2",
      apiVersion: "2006-03-01",
      ...config,
    });

    const upload = (file, customParams = {}) => {
      return new Promise(async (resolve, reject) => {
        // upload file on S3 bucket
        const path = file.path ? `${file.path}/` : "";

        let body = file.stream || Buffer.from(file.buffer, "binary");
        if (
          file.mime &&
          (file.mime.indexOf("text/") === 0 || file.mime === "application/json")
        ) {
          // zip content
          body = zlib.gzipSync(
            file.stream ? await buffer(file.stream) : file.buffer
          );
          customParams.ContentEncoding = "gzip";
        }

        S3.upload(
          {
            Key: `${path}${file.hash}${file.ext}`,
            Body: body,
            ACL: "public-read",
            ContentType: file.mime,
            ...customParams,
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
    };

    return {
      upload(file, customParams = {}) {
        return upload(file, customParams);
      },
      uploadStream(file, customParams = {}) {
        return upload(file, customParams);
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : "";
          S3.deleteObject(
            {
              Key: `${path}${file.hash}${file.ext}`,
              ...customParams,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve();
            }
          );
        });
      },
    };
  },
};
