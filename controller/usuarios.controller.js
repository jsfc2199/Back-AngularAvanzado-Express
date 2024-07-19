const Usuario = require('../models/usuario')

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google') //podemos filtrar lo que queremos que retorne
  res.status(200).json({
    ok: true,
    usuarios
  });
};

const crearUsuarios = async (req, res) => {
    const {email, password, nombre} = req.body

    //creando sin validar
    const usuario = new Usuario(req.body)

    //grabar en bd
    await usuario.save()

    res.status(200).json({
      ok: true,
      usuario,
    });
  };

module.exports = {
  getUsuarios,
  crearUsuarios
};
