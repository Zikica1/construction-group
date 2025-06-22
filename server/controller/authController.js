const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: 'Username and password are require' });
  }

  try {
    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) {
      return res.sendStatus(401);
    }

    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true, //true je za produkciju a false za razvoj
        sameSate: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ roles, accessToken });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { handleLogin };
