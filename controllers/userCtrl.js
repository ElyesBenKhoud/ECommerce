const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email is already in user." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "password should be at least 7 character" });

      //password bcrypt
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      res.json({ msg: newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
