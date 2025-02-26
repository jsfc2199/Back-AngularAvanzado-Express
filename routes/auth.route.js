/*
    Path: 'api/login
*/
const { Router } = require("express");
const { login, loginGoogle, renewToken } = require('../controller/auth.controller');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJWT } = require("../middlewares/validar-jwt.middleware");

const router = Router()

router.post('/',[
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    validarCampos
], login)

router.post('/google',[
    check('token', 'El token de google es requerido').not().isEmpty(),
    validarCampos
], loginGoogle)

//renovación del token
router.get('/renew',[
    validarJWT
], renewToken)
module.exports = router