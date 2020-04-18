const Constraint = require('./Constraint');

class Validator {
  constructor() {
    this.constraints = {};
  }

  register(id, message, func) {
    if (typeof (id) !== 'string') { throw new Error('Constraint id must be string'); }
    if (typeof (message) !== 'string') { throw new Error('Constraint id must be string'); }
    if (typeof (func) !== 'function') { throw new Error('Constraint func must be function'); }
    this.constraints[id] = new Constraint(id, message, func);
  }

  constraint(id) {
    if (Object.prototype.hasOwnProperty.call(this.constraints, id)) { return this.constraints[id]; }
    throw new Error(`The constraint id: "${id}" has not been registered.`);
  }

  validate(inputData, rule) {
    const obj = inputData === undefined ? {} : inputData;
    if (!obj || typeof (obj) !== 'object') { throw new Error('The obj must be object'); }
    if (!rule || typeof (rule) !== 'object') { throw new Error('The rule must be object'); }
    const keys = Object.keys(rule);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (Object.prototype.hasOwnProperty.call(rule, key)) {
        const ruleVal = rule[key];
        if (Array.isArray(ruleVal)) {
          for (let j = 0; j < ruleVal.length; j += 1) {
            const con = ruleVal[j];
            let constraint;
            if (typeof (con) === 'string') { constraint = this.constraint(con); } else { constraint = this.constraint(con.constraint); }
            if (!(constraint instanceof Constraint)) { throw new Error('The value in array must be Constraint'); }
            if (constraint.func(obj[key]) !== true) {
              return (con.message || constraint.message || `The constaint: ${constraint.id} did not pass.`);
            }
          }
        } else {
          const result = this.validate(obj[key], rule[key]);
          if (result) return result;
        }
      }
    }
    return undefined;
  }
}

module.exports = Validator;
