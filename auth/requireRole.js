function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("Nisi logovan");
    }

    if (req.user.role !== role) {
      return res.status(403).send("Nemaš pristup");
    }

    next();
  };
}

module.exports = { requireRole };
