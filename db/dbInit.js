//This file initializes the sqlite database
//Only run this at first install or if you plan to reset the database completely

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

require('../models/servers')(sequelize, Sequelize.DataTypes);
require('../models/users')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f')

sequelize.sync({ force }).then(async () => {
    console.log('Database synced')
    sequelize.close()
}).catch(console.error)
