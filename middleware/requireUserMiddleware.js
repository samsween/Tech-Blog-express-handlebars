const requireUserOwnerMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page" });
  }
  next();
};

module.exports = requireUserOwnerMiddleware;
