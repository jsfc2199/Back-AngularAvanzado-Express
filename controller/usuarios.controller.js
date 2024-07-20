const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt.helper");

const Usuario = require("../models/usuario.model");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google"); //podemos filtrar lo que queremos que retorne
  res.status(200).json({
    ok: true,
    usuarios,
    uuid: req.uuid //leemos el uuid seteado por el middleware del jwt
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

    //generar JWT
    const token = await generarJWT(usuario.id);
    res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error, revisar logs",
    });
  }
};

const actualizarUsuario = async (req, res) => {
  //TODO: Validar token y comprobar si es el usuario correcto
  const uuid = req.params.id;
  try {
    const usuarioDb = await Usuario.findById(uuid);

    if (!usuarioDb) {
      res.status(404).json({
        ok: false,
        msg: "no existe un usuario con ese id",
      });
    }

    //Actualizaciones
    const { password, google, email, ...campos } = req.body; //no queremos hacerle seguimiento ni a pass ni google

    if (usuarioDb.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con el email escrito",
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uuid, campos, {
      new: true, //hacemos que retorne el nuevo dato
    });

    res.json({
      ok: true,
      usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error, revisar logs",
    });
  }
};

const deleteUsuario = async (req, res = response) => {
  const { id } = req.params;
  try {
    const usuarioDb = await Usuario.findById(id);

    if (!usuarioDb) {
      res.status(404).json({
        ok: false,
        msg: "no existe un usuario con ese id",
      });
    }

    await Usuario.findOneAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Usuario eliminado",
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
  actualizarUsuario,
  deleteUsuario,
};
