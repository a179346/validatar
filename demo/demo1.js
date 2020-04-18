const Validatar = new (require('validatar'))();

Validatar.register('required', 'must exist', (v) => v !== undefined);
Validatar.register('isString', 'must be string', (v) => (v === undefined) || (typeof (v) === 'string'));

const data = {
  str1: '123',
  obj1: {
    str2: '456',
  },
};

const rule = {
  str1: ['required', 'isString'],
  obj1: {
    obj2: {
      str3: [{ constraint: 'required', message: 'str3 must exist' }, { constraint: 'isString', message: 'str3 must be string' }],
    },
    str2: [{ constraint: 'isString', message: 'str2 must be string' }],
  },
};

const result = Validatar.validate(data, rule);
console.log(result);
// expected output: "str3 must exist"
