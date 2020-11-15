module.exports = (sequelize, type) => {
    return sequelize.define('Radiobases', {
        RADIOBASE: {
            type: type.STRING,
            primaryKey: true,
        },
        FECHA: type.DATE,
        REGION: type.STRING,
        TRAFICO: type.STRING
    })
}