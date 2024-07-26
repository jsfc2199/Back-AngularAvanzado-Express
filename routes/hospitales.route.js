/*
    Ruta, /api/hospitales
*/
const { check } = require("express-validator");
const { Router } = require("express");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJWT } = require("../middlewares/validar-jwt.middleware");

const {
  actualizarHospital,
  borrarHospital,
  crearHospital,
  getHospitales,
} = require("../controller/hospitales.controller");

const router = Router();

router.get("/",validarJWT, getHospitales);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre del hospital es necesario").not().isEmpty(),
    validarCampos
  ],
  crearHospital
);

router.put("/:id", [
    validarJWT,
    check("nombre", "el nombre del hospital es necesario").not().isEmpty(),
    validarCampos
], actualizarHospital);

router.delete("/:id",  [
  validarJWT, 
],borrarHospital);

module.exports = router;
