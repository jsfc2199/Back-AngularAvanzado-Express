const fs = require('fs')

const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const actualizarImagen = async  (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "medicos":
        const medico = await Medico.findById(id)
        if(!medico){
            return false;
        }
        const oldPath = `./uploads/medicos/${medico.img}`
        //borramos la imagen si existe
        if(fs.existsSync(oldPath)){
            fs.unlinkSync(oldPath)
        }

        medico.img = nombreArchivo

        await medico.save()
        return true
      
    case "hospitales":
      break;
    case "usuarios":
      break;
  }
};

module.exports = { actualizarImagen };
