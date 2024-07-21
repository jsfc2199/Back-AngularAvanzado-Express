const { response, json } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt.helper");
const { googleVerify } = require("../database/google-verify");

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

const loginGoogle = async (req, res) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);
    res.json({
      ok: true,
      email,
      name,
      picture,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "token no correcto",
    });
  }
};

module.exports = {
  login,
  loginGoogle,
};
