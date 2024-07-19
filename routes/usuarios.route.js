/*
    Ruta, /api/usuarios
*/
const { Router } = require("express");
const { getUsuarios } = require("../controller/usuarios.controller");

const router = Router();

router.get("/", getUsuarios);

module.exports = router;
