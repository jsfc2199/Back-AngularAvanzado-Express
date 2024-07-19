const Usuario = require('../models/usuario')

const getUsuarios = (req, res) => {
  res.status(200).json({
    ok: true,
    usuarios: [],
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
