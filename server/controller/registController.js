const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUsers = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: 'Username and password are require' });
  }

  try {
    const duplicate = await User.findOne({ username: user }).exec();

    if (duplicate) {
      return res.sendStatus(409);
    }
    const hashPwd = await bcrypt.hash(pwd, 10);
    await User.create({
      username: user,
      password: hashPwd,
    });

    res.status(201).json({ message: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { handleUsers };
