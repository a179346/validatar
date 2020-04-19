
function Constraint(constraintId, message, checkFunction) {
  this.constraintId = constraintId;
  this.message = message;
  this.checkFunction = checkFunction;
}

Constraint.prototype.check = function (value, params, message, key, position) {
  if (this.checkFunction(value, params) !== true) {
    const { constraintId } = this;
    const result = {
      constraintId,
      position,
      key,
      value,
      params,
    };
    result.message = message || this.message;
    if (typeof (result.message) === 'string') {
      result.message = result.message
        .replace(/%\{key\}/g, key)
        .replace(/%\{value\}/g, value)
        .replace(/%\{position\}/g, position)
        .replace(/%\{constraintId\}/g, constraintId);
    }
    return result;
  }
  return undefined;
};

module.exports = Constraint;
