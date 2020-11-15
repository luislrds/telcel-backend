module.exports = (sequelize, type) => {
    return sequelize.define('Habilidades', {
        ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        USUARIOID: {
            type: type.INTEGER,
        },
        NOMBRE: type.STRING(30)
    })
}