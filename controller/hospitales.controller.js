const { response } = require("express");
const Hospital = require("../models/hospital.model");

const getHospitales = async (req, res = response) => {
  //usamos populate para traer las relaciones
  const hospitales = await Hospital.find().populate("usuario", "nombre img");
  res.json({
    ok: true,
    hospitales,
  });
};
const actualizarHospital = async (req, res = response) => {
  try {

    const idHospital = req.params.id
    const idUsuario = req.uuid

    const hospitalDb = await Hospital.findById(idHospital)
    if(!hospitalDb){
      res.status(404).json({
        ok: false,
        msg: "No existe hospital con ese id",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: idUsuario
    }
    const hospitalActualizado = await Hospital.findByIdAndUpdate(idHospital, cambiosHospital, {new : true})
   
    res.json({
      ok: true,
      hospital: hospitalActualizado
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
  
};
const crearHospital = async (req, res = response) => {
  const uuid = req.uuid;
  const hospital = new Hospital({
    usuario: uuid, //relacionamos el uuid del usuario al hospital
    ...req.body,
  });
  try {
    const hospitalDb = await hospital.save();
    res.json({
      ok: true,
      hospitalDb,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};
const borrarHospital = async(req, res = response) => {
  try {

    const idHospital = req.params.id

    const hospitalDb = await Hospital.findById(idHospital)
    if(!hospitalDb){
      res.status(404).json({
        ok: false,
        msg: "No existe hospital con ese id",
      });
    }
  
    await Hospital.findByIdAndDelete(idHospital)
   
    res.json({
      ok: true,
      msg: 'hospital eliminado'
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};

module.exports = {
  getHospitales,
  actualizarHospital,
  crearHospital,
  borrarHospital,
};
