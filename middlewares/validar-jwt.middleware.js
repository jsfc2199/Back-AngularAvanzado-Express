const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario.model')

const validarJWT = (req, res, next) => {
  //Leer token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uuid } = jwt.verify(token, process.env.JWT_SECRET); //comprobamos el toquen que viene con nuestra firma

    req.uuid = uuid; //enviamos el uuid si queremos
    next();

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

const validarAdminRole = async(req, res, next) => {
  const  uuid = req.uuid
  try {
    const usuarioDB = await Usuario.findById(uuid)
    if(!usuarioDB){
      return res.status(404).json({
        ok:false,
        msg: 'Usuario no existe'
      })
    }

    if(usuarioDB.role !== 'ADMIN_ROLE'){
      return res.status(403).json({
        ok:false,
        msg: 'Usuario no tiene privilegios'
      })
    }
    next()
    
  } catch (error) {
    res.status(500).json({
      ok:false,
      msg: 'hable con el admin'
    })
  }
}

module.exports = {
  validarJWT,
  validarAdminRole
};
