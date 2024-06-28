const { User, addUserSchema } = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { mailVerification } = require("../../utils/mailVerification");

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
    const url = gravatar.url(req.body.email);
    const verificationToken = uuidv4();
    const createUser = User({
      password: bcrypt.hashSync(password, bcryptSalt),
      email: req.body.email,
      avatarURL: url,
      verificationToken: verificationToken,
    });
    const user = await createUser.save();

    const verificationLink = `http://localhost:3000/api/users/verify/${verificationToken}`;
    const text = `
Thank you very much, ${email}, for registering in this APP. Continue with registration at the following link: ${verificationLink}`;
    await mailVerification(email, text);
    res
      .status(201)
      .json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error de Joi u otra biblioteca de validación",
    });
  }
};

module.exports = registerUser;
