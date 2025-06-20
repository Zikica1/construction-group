const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const headerAuthorization =
    req.headers.authorization || req.headers.Authorization;

  if (!headerAuthorization?.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = headerAuthorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);

    req.user = payload.UserInfo.username;
    req.roles = payload.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
