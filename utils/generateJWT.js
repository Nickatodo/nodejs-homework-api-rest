const jwt = require("jsonwebtoken");

const generateJWT = (_id, email, subscription) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id, email, subscription },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) {
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
