const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
class Blog extends Model {}


Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }, 

}, {
    sequelize,
    modelName: 'blog',
    tableName: 'blog',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = Blog;