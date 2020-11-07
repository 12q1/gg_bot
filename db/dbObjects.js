const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const users = require('../models/users')(sequelize, Sequelize.DataTypes);
const servers = require('../models/servers')(sequelize, Sequelize.DataTypes);

users.belongsTo(servers, { foreignKey: 'user_id', as: 'user' });

module.exports = { users, servers }