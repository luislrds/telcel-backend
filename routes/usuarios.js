const { query } = require('express');
var express = require('express');
const habilidad = require('../models/habilidad');
var router = express.Router();
//const { check, validationResult } = require('express-validator/check');

const { Usuarios, Habilidades } = require('../sequalize')

router.get('/', function(req, res, next) {
    Usuarios.findAll().then(usuario => res.json(usuario))
});

router.get('/:id', function(req, res, next) {
    Usuarios.findAll({
        where: {
            ID: req.params.id,
        },
        include: [
            { model: Habilidades, as: 'HABILIDADES' }
        ]
    }).then(usuario => res.json(usuario[0]))
});

router.post('/', function(req, res, next) {
    var usuario = req.body
    const {
        NOMBRE,
        APELLIDOPATERNO,
        APELLIDOMATERNO,
        EMAIL,
        PUESTO,
        FECHANACIMIENTO,
        DIRECCION,
        NUMEXT,
        NUMINT,
        COLONIA,
        MUNICIPIO,
        ESTADO,
        PAIS,
        CP,
        HABILIDADES
    } = usuario

    var user = null;
    Usuarios.create(usuario).then(r => {
        user = r.dataValues;
        usuario.HABILIDADES.map(hab => {
            hab.USUARIOID = user.ID,
                Habilidades.create(hab)
        });

        res.json(user)
    })

});

module.exports = router;