const { Contact } = require("../../schema/contactSchema");

const removeContact = async (req, res) => {
  try {
    await Contact.findOneAndDelete({
      _id: req.params.contactId,
    });
    res.status(200).json({ mensaje: "contacto eliminado" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = removeContact;
