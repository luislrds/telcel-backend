module.exports = (sequelize, type) => {
    return sequelize.define('Usuarios', {
        ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NOMBRE: type.STRING(50),
        APELLIDOPATERNO: type.STRING(50),
        APELLIDOMATERNO: type.STRING(50),
        EMAIL: {
            type: type.STRING,
            validate: {
                isEmail: true
            }
        },
        PUESTO: type.STRING(50),
        FECHANACIMIENTO: {
            type: type.DATEONLY,
            validate: {
                isDate: true
            }
        },
        DIRECCION: type.STRING(100),
        NUMEXT: type.STRING(10),
        NUMINT: type.STRING(10),
        COLONIA: type.STRING(50),
        MUNICIPIO: type.STRING(50),
        ESTADO: type.STRING(50),
        PAIS: type.STRING(50),
        CP: type.STRING(5)
    })
}