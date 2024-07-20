//Modelo de mongoose
const { Schema, model } = require("mongoose");

const MedicoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }, 
  img: {
    type: String
  }, 
  //relación con el usuario que lo crea
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required:true
  }, 
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required:true
  }, 
}, {collection: 'Medicos'}); //el collection es para darle el nombre que queremos a la bd

//modificamos el esquema para no retornar el _id ni el __v
MedicoSchema.method('toJSON', function(){
  const { __v, ...object } = this.toObject();
  return object
})

//exponemos el esquema
module.exports = model('Medico', MedicoSchema)
