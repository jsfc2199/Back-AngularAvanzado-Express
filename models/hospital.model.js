//Modelo de mongoose
const { Schema, model } = require("mongoose");

const HospitalSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }, 
  img: {
    type: String
  }, 
  //relación con el usuario que lo crea
  usuario: {
    required:true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }, 
}, {collection: 'hospitales'}); //el collection es para darle el nombre que queremos a la bd

//modificamos el esquema para no retornar el _id ni el __v
HospitalSchema.method('toJSON', function(){
  const { __v, ...object } = this.toObject();
  return object
})

//exponemos el esquema
module.exports = model('Hospital', HospitalSchema)
