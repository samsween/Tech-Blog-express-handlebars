
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}


Like.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    comment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'comment',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'like',
    tableName: 'like',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = Like;