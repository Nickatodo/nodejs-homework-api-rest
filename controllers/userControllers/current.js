const { User } = require("../../schema/userSchema");

const current = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user });
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = current;
