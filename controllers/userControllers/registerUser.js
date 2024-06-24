const { User, addUserSchema } = require("../../schema/userSchema");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { error } = addUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "all required fields",
      });
    }

    const { password, email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const bcryptSalt = bcrypt.genSaltSync();
    const createUser = User({
      password: bcrypt.hashSync(password, bcryptSalt),
      email: req.body.email,
    });
    const user = await createUser.save();
    res
      .status(201)
      .json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error de Joi u otra biblioteca de validación" });
  }
};

module.exports = registerUser;
