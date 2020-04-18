
function Constraint(constraintId, message, checkFunction) {
  this.id = constraintId;
  this.message = message;
  this.func = checkFunction;
}

module.exports = Constraint;
