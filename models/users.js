module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		server_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
        name: DataTypes.STRING,
	}, {
		timestamps: false,
	});
};