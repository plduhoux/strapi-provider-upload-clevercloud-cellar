# strapi-provider-upload-clevercloud-cellar

## Install

In your strapi project,

```
npm i strapi-provider-upload-clevercloud-cellar
```

Then, visit `https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#using-a-provider` and configure your access to this provider

## Configuration

Configuration example (extensions/upload/config/settings.json) :

```json
{
  "provider": "clevercloud-cellar",
  "providerOptions": {
    "host": "cellar-c2.services.clever-cloud.com",
    "accessKeyId": "keyId",
    "secretAccessKey": "keySecret",
    "params": {
      "Bucket": "my-bucket"
    }
  }
}
```

## Compatibility

- 1.0.0 is compatible up to strapi 3.0.0-beta.19
- 1.0.1 is compatible after strapi 3.0.0-beta.20
- 1.0.3 is compatible with strapi 4

## Resources

- [MIT License](LICENSE.md)

## Links

- [Clever Cloud Cellar](https://www.clever-cloud.com/doc/addons/cellar/)
- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
