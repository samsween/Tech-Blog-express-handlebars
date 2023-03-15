const {Router} = require('express');
const { Comment } =  require('../../models');
const router = Router();


router.post('/', async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({message: 'You must be logged in to create a comment'});
    }
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({message: 'You must be logged in to delete a comment'});
    }
    if (!req.session.user_id === req.body.user_id) {
        return res.status(401).json({message: 'You must be the owner of this comment to delete it'});
    }
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!commentData) {
            res.status(404).json({message: 'No comment found with this id!'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {

        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({message: 'You must be logged in to update a comment'});
    }
    if (!req.session.user_id === req.body.user_id) {
        return res.status(401).json({message: 'You must be the owner of this comment to update it'});
    }
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!commentData) {
            res.status(404).json({message: 'No comment found with this id!'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;