/*
    Path: 'api/login
*/
const { Router } = require("express");
const { login } = require('../controller/auth.controller');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const router = Router()

router.post('/',[
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    validarCampos
], login)

module.exports = router