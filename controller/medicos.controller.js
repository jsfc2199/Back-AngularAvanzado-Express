const { response } = require("express");
const Medico = require('../models/medico.model')
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
const crearMedico = async(req, res = response) => {
  const uuid = req.uuid
  const medico = new Medico({
    usuario: uuid, //relacionamos el uuid del usuario al hospital
    ...req.body
  })
  try {
    const medicoDb = await medico.save()
    res.json({
      ok: true,
      msg: medicoDb,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
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
