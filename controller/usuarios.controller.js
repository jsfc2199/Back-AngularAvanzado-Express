const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google"); //podemos filtrar lo que queremos que retorne
  res.status(200).json({
    ok: true,
    usuarios,
  });
};

const crearUsuarios = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //validar correo único
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Correo ya existe",
      });
    }

    //creando sin validar
    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //grabar en bd
    await usuario.save();

    res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error, revisar logs",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuarios,
};
