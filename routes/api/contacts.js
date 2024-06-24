const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contactControllers/index");

const { validateJWT } = require("../../utils/validateJWT");

router.get("/", validateJWT, controllers.listContacts);

router.get("/:contactId", validateJWT, controllers.getContactById);

router.post("/", validateJWT, controllers.addContact);

router.delete("/:contactId", validateJWT, controllers.removeContact);

router.put("/:contactId", validateJWT, controllers.updateContact);

router.patch(
  "/:contactId/favorite",
  validateJWT,
  controllers.updateStatusContact
);

module.exports = router;
