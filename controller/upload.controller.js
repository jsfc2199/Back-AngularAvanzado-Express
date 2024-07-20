const { response } = require("express");
const { v4 } = require("uuid");

const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");
const {actualizarImagen} = require("../helpers/actualizar-imagen.helper");

const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "tipos no validos: hospitales medicos usuarios",
    });
  }

  //validamos que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "no hay archivo en la petición",
    });
  }

  //procesamos la imagen
  const file = req.files.imagen;

  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "tipos no validos para el archivo que se carga: png jpg jpeg gif",
    });
  }

  //generar nombre de archivo porque debo tenerlas de manera única
  const fileName = `${v4()}.${extensionArchivo}`;

  //Path para guardar la imagen
  const path = `./uploads/${tipo}/${fileName}`;

  //Mover imágenes a donde queremos guardarla
  file.mv(path, (err) => {
    if (err)
      return res.status(500).json({
        ok: false,
        msg: "error al mover la imagen",
      });

    //actualizar bd
    actualizarImagen(tipo, id, fileName)

    res.status(200).json({
      ok: true,
      msg: "archivo subido",
      fileName,
    });
  }); 
};

module.exports = {
  fileUpload,
};
