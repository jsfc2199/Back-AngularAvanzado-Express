const { response } = require("express");
const { validationResult } = require("express-validator"); //para validar los errores del body

const validarCampos = (req, res = response, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }

  next();
};

module.exports = {
  validarCampos,
};
