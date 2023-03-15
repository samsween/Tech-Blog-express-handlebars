const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
class User extends Model {
    async checkPassword(password) {
        const isValid = await bcrypt.compare(password, this.password);
        return isValid;
    }
}


User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        }
    },
    sequelize,
    modelName: 'user',
    tableName: 'user',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = User;