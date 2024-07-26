const { response, json } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt.helper");
const { googleVerify } = require("../database/google-verify");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

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
      menu: getMenuFrontEnd(usuarioDb.role)
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
    const usuarioDb = await Usuario.findOne({email})

    let usuario;

    if(!usuarioDb){
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true //de que se grabó el usuario a través de google
      })
    }else{
      usuario = usuarioDb
      usuario.google = true;
    }

    //guardar usuario
    await usuario.save()

    //generar JWT
    const token = await generarJWT(usuario.id)

    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
      menu: getMenuFrontEnd(usuario.role)
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "token no correcto",
    });
  }
};

const renewToken = async (req, res) => {
  const id = req.uuid

  //generar JWT
  const token = await generarJWT(id)
  const userDb = await Usuario.findById(id)

  res.json({
    ok:true,
    token,
    userDb,
    menu: getMenuFrontEnd(userDb.role)
  })
}

module.exports = {
  login,
  loginGoogle,
  renewToken
};
