const { response } = require("express");
const getHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getHospitales",
  });
};
const actualizarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarHospital",
  });
};
const crearHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "crearHospital",
  });
};
const borrarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarHospital",
  });
};

module.exports = {
  getHospitales,
  actualizarHospital,
  crearHospital,
  borrarHospital
};
