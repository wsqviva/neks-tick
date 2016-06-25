[![Build Status](https://travis-ci.org/wsqviva/neks-tick.png)](https://travis-ci.org/wsqviva/neks-tick)
[![codecov](https://codecov.io/gh/wsqviva/neks-tick/branch/master/graph/badge.svg)](https://codecov.io/gh/wsqviva/neks-tick)
[![npmversion](https://img.shields.io/npm/v/neks-tick.svg)](https://www.npmjs.com/package/neks-tick)
[![liscense](https://img.shields.io/npm/l/neks-tick.svg)](https://www.npmjs.com/package/neks-tick)

### install
`npm install neks-tick --save`

### usage
```javascript
var nextTick = require('neks-tick');

nextTick(function() {
  // log 2 after log 1
  console.log(2);
});

// fisrt log 1
console.log(1);
```
