const { Router } = require("express");

const { User } = require("../../models/index");
const router = Router();
router.post("/signup", async (req, res) => {
  const userExists = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (userExists) {
    return res.status(400).json({ message: "Username already exists" });
  }
  User.create(req.body)
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.loggedIn = true;
        return res.status(200).json({ message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Something went wrong" });
    });
});

router.post("/login", async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "Invalid username/password" });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid username/password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      
      res.json({ message: "You are now logged in!" });
    });
  });
});

router.delete("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
