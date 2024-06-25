const { User, updateSubUserSchema } = require("../../schema/userSchema");

const renovateSub = async (req, res) => {
  try {
    const { error } = updateSubUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Subscription required",
      });
    }
    const contact = await User.findByIdAndUpdate(req.user, {
      subscription: req.body.subscription,
    });
    res.status(200).json({ message: "Updated subscription" });
  } catch (error) {
    res.status(404).json({ message: "error updating subscription" });
  }
};

module.exports = renovateSub;
