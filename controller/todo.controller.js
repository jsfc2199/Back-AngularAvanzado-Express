const { response } = require("express");
const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const getTodo = async (req, res = response) => {
  const search = req.params.todo;
  const regex = new RegExp(search, "i"); //i de insensible

  const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
  ]);

  res.status(200).json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

module.exports = {
  getTodo,
};
