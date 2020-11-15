const Sequelize = require('sequelize')
const UsuarioModel = require('./models/usuario')
const HabilidadModel = require('./models/habilidad')
const RadiobaseModel = require('./models/radiobase')

const sequelize = new Sequelize('ejercicios', 'azureusertelcel', 'telcel#2020', {
    host: 'azure-ejercicios.database.windows.net',
    dialect: 'mssql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
})

const Usuarios = UsuarioModel(sequelize, Sequelize)
const Habilidades = HabilidadModel(sequelize, Sequelize)

Usuarios.hasMany(Habilidades, { foreignKey: 'USUARIOID', as: "HABILIDADES" });

const Radiobases = RadiobaseModel(sequelize, Sequelize)

sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    Usuarios,
    Habilidades,
    Radiobases
}