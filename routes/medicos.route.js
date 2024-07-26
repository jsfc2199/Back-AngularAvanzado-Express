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
  getMedicoById
} = require("../controller/medicos.controller");

const router = Router();

router.get("/", validarJWT, getMedicos);

router.get("/:id", validarJWT, getMedicoById)

router.post("/", [
  validarJWT,
  check("nombre", "el nombre del medico es necesario").not().isEmpty(),
  check("hospital", "el id del hospital debe de ser válido").isMongoId(),
  validarCampos
], crearMedico);

router.put("/:id", [
  validarJWT,
  check("nombre", "el nombre del medico es necesario").not().isEmpty(),
  check("hospital", "el id del hospital debe de ser válido").isMongoId(),
  validarCampos
], actualizarMedico);

router.delete("/:id", validarJWT,borrarMedico);

module.exports = router;
