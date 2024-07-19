//Modelo de mongoose
const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  },
});

//modificamos el esquema para no retornar el _id ni el __v
UsuarioSchema.method('toJSON', function(){
  const { __v, _id, ...object } = this.toObject();

  object.uuid = _id
  return object
})

//exponemos el esquema
module.exports = model('Usuario', UsuarioSchema)
