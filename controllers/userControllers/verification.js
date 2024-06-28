const { User } = require("../../schema/userSchema");

const verification = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.verificationToken,
    });
    if (user) {
      await User.findByIdAndUpdate(
        user._id,
        {
          verify: true,
          verificationToken: null,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Verification successful" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = verification;
