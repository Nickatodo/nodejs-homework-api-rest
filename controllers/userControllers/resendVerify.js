const { User, resendVerifyUserSchema } = require("../../schema/userSchema");
const { mailVerification } = require("../../utils/mailVerification");

const resendVerify = async (req, res) => {
  try {
    const { error } = resendVerifyUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Missing required field email" });
    }
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user.verify === false) {
      const verificationToken = user.verificationToken;
      const verificationLink = `http://localhost:3000/api/users/verify/${verificationToken}`;
      const text = `
Thank you very much, ${user.email}, for registering in this APP. Continue with registration at the following link: ${verificationLink}`;
      await mailVerification(user.email, text);
      res.status(200).json({ message: "Verification email sent" });
    } else {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error de Joi u otra biblioteca de validación" });
  }
};

module.exports = resendVerify;
