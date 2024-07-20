const fs = require('fs')

const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const borrarImagen = (path) => {
        if(fs.existsSync(path)){
            fs.unlinkSync(path)
        }
}
const actualizarImagen = async  (tipo, id, nombreArchivo) => {
    let oldPath
  switch (tipo) {
    case "medicos":
        const medico = await Medico.findById(id)

        if(!medico){
            return false;
        }
        oldPath = `./uploads/medicos/${medico.img}`

        borrarImagen(oldPath)

        medico.img = nombreArchivo

        await medico.save()
        return true
      
    case "hospitales":
      const hospital = await Hospital.findById(id)
        
        if(!hospital){
            return false;
        }
        oldPath = `./uploads/hospitales/${hospital.img}`

        borrarImagen(oldPath)

        hospital.img = nombreArchivo

        await hospital.save()
        return true
    case "usuarios":
        const usuario = await Usuario.findById(id)
        
        if(!usuario){
            return false;
        }
        oldPath = `./uploads/hospitales/${usuario.img}`

        borrarImagen(oldPath)

        usuario.img = nombreArchivo

        await usuario.save()
        return true
      break;
  }
};

module.exports = { actualizarImagen };
