
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}


Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'blog',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'comment',
    tableName: 'comment',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = Comment;