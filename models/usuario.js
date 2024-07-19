//Modelo de mongoose
const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
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
    type: string
  },
  role: {
    type: String,
    required: true,
    default: 'USER:ROLE'
  },
  google: {
    type: Boolean,
    default: false
  },
});

//exponemos el esquema
module.exports = model('Usuario', UsuarioSchema)
