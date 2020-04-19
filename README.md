# validatar
Javascript data validator. 
<br>
A simple way to validate date and customerize the constraint.
## Links
[npm package](https://www.npmjs.com/package/validatar)
<br>
[Github page](https://github.com/a179346/validatar)
<br>
[async-validatar](https://www.npmjs.com/package/async-validatar)

## Demo
```js
const Validatar = require('validatar');

Validatar.register('required', '%{key} is required', (v) => v !== undefined);
Validatar.register('isString', '%{key} is not a string. value:%{value} position:%{position}', (v) => (typeof (v) === 'string'));

const data = {
  str1: 'I am a string!',
  obj1: {
    str2: 456,
  },
};

const rule = {
  str1: [{ constraint: 'isString', message: 'str1 must be string' }],
  obj1: {
    str2: ['required', 'isString'],
  },
};

const result = Validatar.validate(data, rule);
console.log(result);
// expected output:
// {
//   constraintId: 'isString',
//   position: 'obj1.str2',
//   key: 'str2',
//   value: 456,
//   params: undefined,
//   message: 'str2 is not a string. value:456 position:obj1.str2',
// }
```

## Another Demo
```js
const Validatar = require('validatar');

Validatar.register('required', new Error('Wrong input format'), (v) => v !== undefined);
Validatar.register('isString', '%{key} is not a string. value:%{value}', (v) => (typeof (v) === 'string'));
Validatar.register('isEmail', '%{key} is not email. value:%{value}', (v) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase())));

const correctData = {
  str1: 'I am a string!',
  obj1: {
    email: 'random@email.com',
  },
};

const rule = {
  str1: [{ constraint: 'required', message: 'str1 not exists' }, { constraint: 'isString', message: new Error('str1 must be string') }],
  obj1: {
    email: ['required', 'isString', 'isEmail'],
  },
};

const correctResult = Validatar.validate(correctData, rule);
console.log(correctResult);
// expected output: undefined

const wrongData = {
  str1: 'I am a string!',
};

const wrongResult = Validatar.validate(wrongData, rule);
console.log(wrongResult);
// expected output:
// {
//   constraintId: 'required',
//   position: 'obj1.email',
//   key: 'email',
//   value: undefined,
//   params: undefined,
//   message: new Error('Wrong input format')
// }
```

## Can pass parameters to check function
```js
const Validatar = require('validatar');

Validatar.register('isString', '%{key} is not a string. value:%{value} position:%{position}', (v) => (typeof (v) === 'string'));
Validatar.register('checkLength', '%{key} length error.', (v, params) => (v.length >= params[0] && v.length <= params[1]));

const data = {
  str1: 'I am a string!',
};

const rule = {
  str1: [
    'isString', {
      constraint: 'checkLength',
      params: [5, 12],
    },
  ],
};

const result = Validatar.validate(data, rule);
console.log(result);
// expected output:
// {
//   constraintId: 'checkLength',
//   position: 'str1',
//   key: 'str1',
//   value: 'I am a string!',
//   params: [5, 12],
//   message: 'str1 length error.',
// }
```
