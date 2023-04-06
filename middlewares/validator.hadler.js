const boom = require('@hapi/boom');


function validatorHandler(schema, property) {
  return (res, req, next) => {
    const data = req[property]; // Podría venir en req.body, req.params, req.query
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  }
}

module.exports = validatorHandler;
