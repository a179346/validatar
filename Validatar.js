const Constraint = require('./Constraint');

const constraints = {};

function register(constraintId, message, checkFunction) {
  if (typeof (constraintId) !== 'string') {
    throw new Error('constraintId is not a string.');
  }
  if (!message) throw new Error('Constraint message is required.');
  if (typeof (checkFunction) !== 'function') {
    throw new Error('Constraint check function is not a function.');
  }
  if (Object.prototype.hasOwnProperty.call(constraints, constraintId)) {
    throw new Error(`The constraintId "${constraintId}" has been taken.`);
  }
  constraints[constraintId] = new Constraint(constraintId, message, checkFunction);
}

function getConstraint(id) {
  if (Object.prototype.hasOwnProperty.call(constraints, id)) {
    return constraints[id];
  }
  throw new Error(`The constraint id: "${id}" has not been registered.`);
}

function validateRecursive(inputData, rule, position) {
  const obj = inputData === undefined ? {} : inputData;
  if (typeof (position) !== 'string') {
    throw new Error('The position is not a string.');
  }
  if (!obj || typeof (obj) !== 'object') {
    throw new Error('The inputData is not an object.');
  }
  if (!rule || typeof (rule) !== 'object') {
    throw new Error('The rule is not an object.');
  }
  const keys = Object.keys(rule);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (Object.prototype.hasOwnProperty.call(rule, key)) {
      const ruleVal = rule[key];
      if (Array.isArray(ruleVal)) {
        for (let j = 0; j < ruleVal.length; j += 1) {
          const con = ruleVal[j];
          let constraint;
          const type = typeof (con);
          if (type === 'string') {
            constraint = getConstraint(con);
          } else if (con && type === 'object' && typeof (con.constraint) === 'string') {
            constraint = getConstraint(con.constraint);
          } else {
            throw new Error(`The value in array can not be considered as a constraint. position:${position + key} value:${con}`);
          }
          if (!(constraint instanceof Constraint)) {
            throw new Error(`The value in array can not be considered as a constraint. position:${position + key} value:${con}`);
          }
          const checkResult = constraint.check(
            obj[key], // value
            type === 'string' ? undefined : con.params, // params
            type === 'string' ? undefined : con.message, // message
            key, // key
            position + key, // position
          );
          if (checkResult) return checkResult;
        }
      } else if (ruleVal && typeof (ruleVal) === 'object') {
        const result = validateRecursive(obj[key], rule[key], `${key}.`);
        if (result) return result;
      } else {
        throw new Error(`The ruleVal is neither array nor object. position:${position + key} value:${ruleVal}`);
      }
    }
  }
  return undefined;
}

function validate(inputData, rule) {
  return validateRecursive(inputData, rule, '');
}

module.exports = {
  register,
  validate,
};
