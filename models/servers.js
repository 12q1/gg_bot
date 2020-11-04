module.exports = (sequelize, DataTypes) => {
    return sequelize.define('servers', {
        server_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};