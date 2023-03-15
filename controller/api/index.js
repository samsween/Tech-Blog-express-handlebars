const {Router} = require('express');
const userRouter = require('./user');
const blogRouter = require('./blog');
const commentRouter = require('./comment');
const likeRouter = require('./like');
const router = Router();

router.use('/user', userRouter);
router.use('/blog', blogRouter);
router.use('/comment', commentRouter);
router.use('/like', likeRouter);
module.exports = router;