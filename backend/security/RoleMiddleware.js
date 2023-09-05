const ROLES = {
    "USER": {
        "PARTICULAR":"PARTICULAR",
        "PROFESSIONAL":"PROFESSIONAL",
        "ASSOCIATION":"ASSOCIATION",
        "LIVREUR":"LIVREUR",
        "TRASHSPOTTER":"TRASHSPOTTER",
    },
    "ADMIN": {
        "ADMIN":"ADMIN"}, 

  "PARTICULAR": { "PARTICULAR": 'PARTICULAR' },
  "PROFESSIONAL": { "PROFESSIONAL": 'PROFESSIONAL' },
  "ASSOCIATION": { "ASSOCIATION": 'ASSOCIATION' },
  "LIVREUR": { "LIVREUR": 'LIVREUR' },
  "TRASHSPOTTER": { "TRASHSPOTTER": 'TRASHSPOTTER' },
};

const inRole =
  (...roles) =>
  (req, res, next) => {
    var role = false;
    for (let check of roles) {
      role = role || Object.keys(check).indexOf(req.user.role) != -1;
      if (role) break;
    }
    if (!role) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };

module.exports = {
  inRole,
  ROLES,
};
