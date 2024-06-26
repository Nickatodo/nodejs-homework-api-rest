const { User, updateAvatarUserSchema } = require("../../schema/userSchema");
const path = require("path");
const fs = require("fs").promises;
const jimp = require("jimp");

const updateAvatarUser = async (req, res) => {
  try {
    // Se verifica que el archivo se este cargando bien.
    if (!req.file) {
      return res.status(400).json({
        message: "avatar file required",
      });
    }
    // Se desestructura la imagen enviada.
    const { path: temPath, filename } = req.file;
    // Se usa Joi para validar la informacion.
    const validate = updateAvatarUserSchema.validate({ path: temPath });
    if (validate.error) {
      return res.status(400).json({
        message: validationResult.error.message,
      });
    }
    // Se crea el nuevo directorio para la img.
    const newPath = path.join(__dirname, "../../public/avatars", filename);
    await fs.rename(temPath, newPath);

    // Se redimensiona la imagen con Jimp.
    const image = await jimp.read(newPath);
    await image.resize(250, 250).writeAsync(newPath);

    // Se guarda la nueva URL
    const avatarURL = `/public/avatars/${filename}`;
    await User.findByIdAndUpdate(req.user, {
      avatarURL: avatarURL,
    });

    res.status(200).json({ avatarURL });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = updateAvatarUser;
