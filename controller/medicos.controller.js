const { response } = require("express");
const Medico = require("../models/medico.model");
const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
  .populate("usuario", "nombre img")
  .populate("hospital", "nombre hospital")

  res.json({
    ok: true,
    medicos,
  });
};

const getMedicoById = async (req, res=response) => {
  const id = req.params.id;
  const medico = await Medico.findById(id)
  .populate("usuario", "nombre img")
  .populate("hospital", "nombre hospital")

  res.json({
    ok: true,
    medico,
  });
}
const actualizarMedico = async (req, res = response) => {

  try {
    const medicoId = req.params.id
    const idUsuario = req.uuid
    const medicoDb = await Medico.findById(medicoId)
  
    if(!medicoDb){
      return res.status(404).json({
        ok: false,
        msg: "Medico no encontrado",
      });
    }
  
    const cambiosMedico = {
      ...req.body,
      usuario: idUsuario
    } 
  
    const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico, {new: true})
  
    return res.status(201).json({
      ok:true,
      medicoActualizado
    })
  } catch (error) {
    return res.status(500).json({
      ok:true,
      msg: 'Hable con el admin'
    })
  }  
};

const crearMedico = async (req, res = response) => {
  const uuid = req.uuid;
  const medico = new Medico({
    usuario: uuid, //relacionamos el uuid del usuario al hospital
    ...req.body,
  });
  try {
    const medicoDb = await medico.save();
    res.json({
      ok: true,
      medicoDb,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};
const borrarMedico = async(req, res = response) => {
  try {
    const medicoId = req.params.id    
    const medicoDb = await Medico.findById(medicoId)
  
    if(!medicoDb){
      return res.status(404).json({
        ok: false,
        msg: "Medico no encontrado",
      });
    }

   await Medico.findByIdAndDelete(medicoId)
  
    return res.status(201).json({
      ok:true,
      msg: 'medico eliminado'
    })
    
  } catch (error) {
    return res.status(500).json({
      ok:true,
      msg: 'Hable con el admin'
    })
  } 
};

module.exports = {
  getMedicos,
  actualizarMedico,
  crearMedico,
  borrarMedico,
  getMedicoById
};
