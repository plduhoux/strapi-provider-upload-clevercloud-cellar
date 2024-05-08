# strapi-provider-upload-clevercloud-cellar

## Install

In your strapi project,

```
npm i strapi-provider-upload-clevercloud-cellar
```

Then, visit `https://docs.strapi.io/cloud/advanced/upload` and configure your access to this provider

## Configuration

Configuration example (config/plugins.js) :

```js
module.exports = ({ env }) => ({
  /*...*/
  upload: {
    config: {
      provider: "strapi-provider-upload-clevercloud-cellar",
      providerOptions: {
        host: "cellar-c2.services.clever-cloud.com",
        accessKeyId: process.env.CELLAR_KEY_ID,
        secretAccessKey: process.env.CELLAR_KEY_SECRET,
        params: {
          Bucket: process.env.CELLAR_BUCKET,
        },
      },
    },
  },
});
```

## Compatibility

- 1.0.0 is compatible up to strapi 3.0.0-beta.19
- 1.0.1 is compatible after strapi 3.0.0-beta.20
- 1.0.4 is compatible with strapi 4

## Resources

- [MIT License](LICENSE.md)

## Links

- [Clever Cloud Cellar](https://www.clever-cloud.com/doc/addons/cellar/)
- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
