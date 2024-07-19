/*
    Ruta, /api/usuarios
*/
const { check } = require('express-validator')
const { Router } = require("express");
const { getUsuarios, crearUsuarios } = require("../controller/usuarios.controller");

const router = Router();

router.get("/", getUsuarios);
router.post("/", [
  //middlewares para validaciones de express
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('password', 'password es obligatorio').not().isEmpty(),
  check('email', 'se debe enviar email con formato de email').isEmail()
] ,crearUsuarios);

module.exports = router;
