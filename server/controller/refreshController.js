const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err || foundUser.username !== payload.username) {
          return res.sendStatus(403);
        }

        const roles = Object.values(foundUser.roles).filter(Boolean);

        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: payload.username,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '5m' }
        );

        res.json({ roles, accessToken });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Server error,tray letter', error: err.message });
  }
};

module.exports = { handleRefreshToken };
