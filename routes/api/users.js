const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/userControllers/index");

const { validateJWT } = require("../../utils/validateJWT");

router.post("/signup", controllers.registerUser);

router.post("/login", controllers.login);

router.get("/logout", validateJWT, controllers.logout);

router.get("/current", validateJWT, controllers.current);

router.patch("/", validateJWT, controllers.renovateSub);

module.exports = router;
