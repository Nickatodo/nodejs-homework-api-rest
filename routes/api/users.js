const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/userControllers/index");

const { validateJWT } = require("../../utils/validateJWT");
const uploader = require("../../utils/uploader");

router.post("/signup", controllers.registerUser);

router.post("/login", controllers.login);

router.get("/logout", validateJWT, controllers.logout);

router.get("/current", validateJWT, controllers.current);

router.patch("/", validateJWT, controllers.renovateSub);

router.patch(
  "/avatars",
  validateJWT,
  uploader.single("avatar"),
  controllers.updateAvatarUser
);

module.exports = router;
