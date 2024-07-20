const { check } = require("express-validator");
const { Router } = require("express");
const {
  getTodo,
  getDocumentosCollection
} = require("../controller/todo.controller");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJWT } = require("../middlewares/validar-jwt.middleware");

const router = Router();

router.get("/:todo", validarJWT, getTodo);
router.get("/collection/:tabla/:todo", validarJWT, getDocumentosCollection);



module.exports = router;
