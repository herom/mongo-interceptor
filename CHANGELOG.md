# mongo-interceptor CHANGELOG

## Version 0.3.1
- [FIX] Guarantee that the provided methods/properties in the main `index.js` and can be called without errors. See [431af3b](https://github.com/herom/mongo-interceptor/commit/431af3b8a45818c48115d5b93e9cf3ff54497d92)
- [DOC] Updated `README.md` - document the new behaviour of `check()`. See [c23bd3d](https://github.com/herom/mongo-interceptor/commit/c23bd3d0d35c663449b717f83d34f85328f9d874), [8f02c17](https://github.com/herom/mongo-interceptor/commit/8f02c171be83b47ce3d949a6e7e43a8915af1d97)

## Version 0.3.0
- [DEV] The replacers are now combined with a `count` starting at `0` (e.g. '_0') in order to make it easier to follow and match the replaced intrusions on bigger strings. See [1737378](https://github.com/herom/mongo-interceptor/commit/17373787abbf7b3f6f65a31690e637ab5d016bf8)
- [DEV] The `check()` method on `lib\interceptor.js` is now capable of processing not only `String` and `Number`, but also `Array` (recursive) and `Object` (deep-nested, recursive, ...). See [27a71ca](https://github.com/herom/mongo-interceptor/commit/27a71ca41d791d4f08ced8ff99d9aa6249921b6b)

## Version 0.2.0
- [DEV] Proxy the `interceptor.js` `setOperatorReplacer()` method directly in `index.js`. See [ef336d1](https://github.com/herom/mongo-interceptor/commit/ef336d11ecb8c169cd745609398b0166733d21da)
- [DEV] Return only "operators" without the leading `$` in order to make them less harmful if you want to log them or even store them in a database. See [28e55d6](https://github.com/herom/mongo-interceptor/commit/28e55d6db4b88a329bbedc17fdfd915a5472c280)
- [DOC] Updated `README.md` - document installation, usage, methods, properties. See [ada0823](https://github.com/herom/mongo-interceptor/commit/ada0823f98c97b1c6abac1e9893ca45fee819e0b)

## Version 0.1.0
- [DOC] Updated `README.md` - Added Travis-CI badge. See [0e90381](https://github.com/herom/mongo-interceptor/commit/0e9038179a81b5166f47ec22d57ac3b1b52e5aa8)
- [DEV] Added Travis-CI configuration/set up Travis-CI. See [f4a6f56](https://github.com/herom/mongo-interceptor/commit/f4a6f56af1bbbcad6a2dc4c209d46e0b264bb03b)
- [DEV] The `interceptor.setOperatorReplacer()` method checks if the given param is valid before it will be set. See [fb7dab6](https://github.com/herom/mongo-interceptor/commit/fb7dab6cda5687482f6ed641463d89e08ac4739a)
- [FIX] Guarantee that the `operators.isOperator()` method can detect also "combined"/"camelCase" operators like `$elemMatch`. See [2288e81](https://github.com/herom/mongo-interceptor/commit/2288e81cf4d0170ad235aea8c03474f2060de0cd)
- [FIX] Fixed tests. See [e1a3c87](https://github.com/herom/mongo-interceptor/commit/e1a3c87823232ed2bc8b4cca74d1dd69474c7135)