
const {Router} = require("express");
const {Like} = require("../../models");
const router = Router();


router.post("/", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({message: "You must be logged in to create a like"});
    }
    const userHasLiked = await Like.findOne({
        where: {
            user_id: req.session.user_id,
            comment_id: req.body.comment_id  
        }
    }) 
    if (userHasLiked) return res.status(400).json({message: "Error"})
    try {
        const newLike = await Like.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newLike);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
);

router.delete("/", async (req, res) => {
    console.log(req.body);
    if (!req.session.loggedIn) {
        return res.status(401).json({message: "You must be logged in to delete a like"});
    }
    try {
        const likeData = await Like.destroy({
            where: {
                user_id: req.body.user_id,
                comment_id: req.body.id
            },
        });
        
        res.status(200).json(likeData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;