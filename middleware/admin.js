function checkAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Action not allowed");
  next();
}

module.exports = checkAdmin;
