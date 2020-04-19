const Validatar = require('../Validatar');

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
//   message: new Error('Wrong input format')
// }
