const { check } = require("express-validator");
const { Router } = require("express");
const expressFileUpload = require('express-fileupload') //middleware para leer archivos
const {
  fileUpload
} = require("../controller/upload.controller");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJWT } = require("../middlewares/validar-jwt.middleware");

const router = Router();

router.use(expressFileUpload()) //usamos el middleware para recibir el archivo

router.put("/:tipo/:id", validarJWT, fileUpload);



module.exports = router;
