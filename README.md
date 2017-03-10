# mongo-interceptor
MongoDB (String) intrusion detector

[![Build Status](https://travis-ci.org/herom/mongo-interceptor.svg?branch=master)](https://travis-ci.org/herom/mongo-interceptor)

## Installation
Install with `npm install --save mongo-interceptor`

## Usage
Require the package like you always do: `var mongoInterceptor = require('mongo-interceptor');`

## Methods
### `check()`
You can check any `String` for "harmful" `mongoDB` operators by calling `mongoInterceptor.checkStr(possibleNOSQLInjectionString)` and you will get an `object` in return, which contains the following information: 

- `escaped`: The escaped `String`
- `isIntrusion`: The `Boolean` to tell if any `mongoDB` operators where detected and escaped
- `injections`: The `[String]` if found `mongoDB` operators

### `setReplacer()`
By default, `mongo-interceptor` is using the underscore (`_`) to escape/replace found `mongoDB` operators, but you can set any other replacement `String` you like - excluding `$` itself. 


## Properties
### `VERSION`
Returns the actual `VERSION` of the library in use.
