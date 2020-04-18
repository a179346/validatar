const Validatar = require('../Validatar');

Validatar.register('required', '%{key} is required', (v) => v !== undefined);
Validatar.register('isString', '%{key} is not a string. value:%{value}', (v) => (typeof (v) === 'string'));

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
// expected output: "str2 is not a string. value:456"
