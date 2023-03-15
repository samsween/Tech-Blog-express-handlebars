const router = require("express").Router();
const {
  getAllBlogs,
  getSingleBlog,
  getBlogsByUser,
} = require("../db/queries/blog");


router.get("/", async (req, res) => {
  await getAllBlogs()
    .then((blogs) => {
      res.render("index", { blogs: blogs, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.render("index", { blogs: [] });
    });
});
router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  const id = req.session.user_id;
  const blogs = await getBlogsByUser(id);
  res.render("dashboard", { loggedIn: req.session.loggedIn, blogs: blogs });
});
router.get("/home", (req, res) => {
  res.render("home", { home: "LOL" });
});
router.get("/blog/:id", async (req, res) => {
  await getSingleBlog(req.params.id)
    .then((blog) => {
      const comments = blog.comments;
      const isCommentLiked = comments.map((comment) => {
        return {
          ...comment,
          isLiked: comment.likes.some((like) => {
        
            return like.user_id === req.session.user_id;
          }),
          userLiked: req.session.user_id,
        };
      });
      blog.comments = isCommentLiked;

      res.render("blog", {
        blog: blog,
        loggedIn: req.session.loggedIn,
        userId: { id: req.session.user_id },
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("blog", { blog: [], loggedIn: req.session.loggedIn });
    });
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});


module.exports = router;