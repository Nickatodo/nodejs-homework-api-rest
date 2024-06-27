const multer = require("multer");
const path = require("path");

// Destino temporal de la imagen cargada.
const tempDir = path.join(__dirname, "../tmp");

// Opciones de destino temporal y nombre del archivo: Fecha-Nombre.img
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage });

module.exports = uploader;
