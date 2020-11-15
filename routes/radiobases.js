var express = require('express');
var router = express.Router();

const { Radiobases } = require('../sequalize')
const { Op } = require('sequelize')

/* GET home page. */
router.post('/', function(req, res, next) {
    const { RADIOBASE, REGION, FECHA } = req.body;
    let fechaFinal = new Date(FECHA);
    let fechaInicial = fechaFinal;
    fechaInicial.setDate(fechaFinal.getDate() - 30);
    let FECHAINICIAL = fechaInicial.getFullYear() + "-" + (fechaInicial.getMonth() + 1) + "-" + fechaInicial.getDay();
    let page = Number(req.body.PAGE) || 1;
    let skip = page - 1;
    skip = skip * 100;
    let radioArray = [];
    var options = {};

    if (RADIOBASE != null && RADIOBASE != "" && REGION != null && REGION != 0) {
        options = {
            where: {
                RADIOBASE: RADIOBASE,
                REGION: REGION,
                FECHA: {
                    [Op.gte]: FECHAINICIAL,
                    [Op.lte]: FECHA
                },
            },
            limit: 300,
            offset: skip,
            order: [
                ['RADIOBASE', 'DESC']
            ]
        }
    } else if (RADIOBASE != null && RADIOBASE != "") {
        options = {
            where: {
                RADIOBASE: RADIOBASE,
                FECHA: {
                    [Op.gte]: FECHAINICIAL,
                    [Op.lte]: FECHA
                }
            },
            limit: 300,
            offset: skip,
            order: [
                ['RADIOBASE', 'DESC']
            ],
        }
    } else if (REGION != null && REGION != 0) {
        options = {
            where: {
                REGION: REGION,
                FECHA: {
                    [Op.gte]: FECHAINICIAL,
                    [Op.lte]: FECHA
                }
            },
            limit: 300,
            offset: skip,
            order: [
                ['RADIOBASE', 'DESC']
            ],
        }
    } else {
        options = {
            where: {
                FECHA: {
                    [Op.gte]: FECHAINICIAL,
                    [Op.lte]: FECHA
                },
            },
            limit: 300,
            offset: skip,
            order: [
                ['RADIOBASE', 'DESC']
            ],
        }
    }

    Radiobases.findAll(options)
        .then(radiobases => {
            radiobases.map(rad => {
                const r = radioArray.filter(r => r.RADIOBASE == rad.RADIOBASE)
                if (r.length == 0) {
                    radioArray.push({
                        RADIOBASE: rad.RADIOBASE,
                        FECHAS: [{
                            FECHA: rad.FECHA,
                            TRAFICO: rad.TRAFICO,
                            REGION: rad.REGION
                        }]
                    })
                } else {
                    let index = radioArray.findIndex(r => r.RADIOBASE == rad.RADIOBASE);
                    radioArray[index].FECHAS.push({
                        FECHA: rad.FECHA,
                        TRAFICO: rad.TRAFICO,
                        REGION: rad.REGION
                    })
                }
            })
            res.json(radioArray)
        })
});

module.exports = router;