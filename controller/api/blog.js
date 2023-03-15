const { Blog, User } = require("../../models/index");
const { Router } = require("express");
const { getSingleBlog } = require("../../lib/blogDb");

const requireUserOwnerMiddleware = require('../../middleware/requireUserOwnerMiddleware');





const router = Router();
router.post("/", async (req, res) => {
  if (!req.session.loggedIn) {
    return res
      .status(401)
      .json({ message: "You must be logged in to create a blog post" });
  }
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view a blog post" });
  }
  const useBlog = await getSingleBlog(req.params.id);
  if (!useBlog) {
    res.status(404).json({ message: "No blog found with this id!" });
    return;
  }
  res.status(200).json(useBlog);
})
router.put("/:id", requireUserOwnerMiddleware,async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:id", requireUserOwnerMiddleware, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
