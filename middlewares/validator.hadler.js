const boom = require('@hapi/boom');


function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // Podría venir en req.body, req.params, req.query
    const { error } = schema.validate(data ,
      {abortEarly:false});
    if (error) {
      next(boom.badRequest(error));
    }
      next();
  }
}

module.exports = validatorHandler;
