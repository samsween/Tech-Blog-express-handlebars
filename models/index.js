const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
const Like = require('./Like');


User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', 
});
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});



Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

Like.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Like, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Like.belongsTo(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});
Comment.hasMany(Like, {
    foreignKey: 'comment_id',
});


module.exports = {User, Blog, Comment, Like};

