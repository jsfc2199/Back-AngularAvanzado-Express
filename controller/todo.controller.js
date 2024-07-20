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

const getDocumentosCollection = async (req, res = response) => {
  const search = req.params.todo;
  const table = req.params.tabla;
  const regex = new RegExp(search, "i");

  let data = [];

  switch (table) {
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );

      break;
    case "Medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");

      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "las tablas son hospitales-Medicos-usuarios",
      });
  }

  res.status(400).json({
    ok: true,
    data,
  });
};

module.exports = {
  getTodo,
  getDocumentosCollection,
};
