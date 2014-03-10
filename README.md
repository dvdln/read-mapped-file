# read-mapped-file
> Read a file and its associated source map.

[![npm Version](https://badge.fury.io/js/read-mapped-file.png)](http://badge.fury.io/js/read-mapped-file)
[![Build Status](https://travis-ci.org/dvdln/read-mapped-file.png?branch=master)](https://travis-ci.org/dvdln/read-mapped-file)

## Usage
```js
var readMappedFile = require('read-mapped-file');

var file = readMappedFile({
  src: 'test.js',
  cwd: 'example'
});

console.log(file.code);
console.log(file.map);
```

## Method
```js
readMappedFile(options, [callback]);
```

- **options** `Object`
    - **src** `String` Source file path.
    - **cwd** `String` Current working directory.
    - **mapSrc** `String` Map file path.
    - **mapDir** `String` Map file root directory.
    - **fs** `Object|String` Options to pass to `fs.readFile`.
    - **code** `String` Source code. If set, `src` is ignored.
    - **map** `JSON` Source map. If set, `mapSrc` is ignored.
- **callback** `Function` Errback `(err, data)`

If `callback` is passed then the file read will be asynchronous. Callbacks are
passed `(err, data)`, where `data` is an object literal:
```js
{
  code: String,
  map: String,
  cwd: String,
  src: String,
  mapSrc: String
}
```
