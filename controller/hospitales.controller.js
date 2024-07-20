const { response } = require("express");
const Hospital = require('../models/hospital.model')

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
const crearHospital = async(req, res = response) => {

  const uuid = req.uuid
  const hospital = new Hospital({
    usuario: uuid, //relacionamos el uuid del usuario al hospital
    ...req.body
  })  
  try {
    const hospitalDb = await hospital.save()
    res.json({
      ok: true,
      msg: hospitalDb,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
  
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
