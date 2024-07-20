const { response } = require("express");
const getMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getMedicos",
  });
};
const actualizarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarMedico",
  });
};
const crearMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "crearMedico",
  });
};
const borrarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarMedico",
  });
};

module.exports = {
  getMedicos,
  actualizarMedico,
  crearMedico,
  borrarMedico
};
