/*
    Ruta, /api/medicos
*/
const { check } = require("express-validator");
const { Router } = require("express");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJWT } = require("../middlewares/validar-jwt.middleware");

const {
  actualizarMedico,
  borrarMedico,
  crearMedico,
  getMedicos,
} = require("../controller/medicos.controller");

const router = Router();

router.get("/", getMedicos);
router.post("/", [], crearMedico);

router.put("/:id", [], actualizarMedico);

router.delete("/:id", borrarMedico);

module.exports = router;
