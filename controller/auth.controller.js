const { response, json } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt.helper");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDb = await Usuario.findOne({ email });

    //verificar email
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    //verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDb.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "password no valido",
      });
    }

    //Generar JWT con payload de ID
    const token = await generarJWT(usuarioDb.id);

    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hablar con el administrador",
    });
  }
};

const loginGoogle = (req, res) => {
  res.status(500).json({
    ok: true,
    msg: req.body.token
  });
}

module.exports = {
  login,
  loginGoogle
};
