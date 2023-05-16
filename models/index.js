const { pool } = require('../config/dbConfig');

const {  Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    pool.options.db,
    pool.options.user,
    pool.options.password,
    {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,

        pool: {
            max: pool.options.max,
            min: pool.options.min,
            idleTimeoutMillis: pool.options.idleTimeoutMillis,
            connectionTimeoutMillis: pool.options.connectionTimeoutMillis
        }
    }
)

const db = {}

//need to set property of sequelize library, and the instance created above
db.Sequelize = Sequelize
db.sequelize = sequelize

//create property for each model
db.users = require('./userModel.js')(sequelize, DataTypes)

//setting force to true, will cause loss of db data
db.sequelize
    .sync({force: false})//force break
    .then(() => {
        console.log('resync complete')
    })

const test = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

test()

module.exports = db 