const requireUserOwnerMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page" });
  }
  if (!req.session.user_id === req.params.id) {
    return res
      .status(401)
      .json({ message: "You must be the owner of this blog post" });
  }

  next();
};

module.exports = requireUserOwnerMiddleware;
