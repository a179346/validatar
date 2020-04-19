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
