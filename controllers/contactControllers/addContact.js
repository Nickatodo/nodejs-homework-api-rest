const { Contact, addContactSchema } = require("../../schema/contactSchema");

const addContact = async (req, res) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    const newContact = Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: false,
    });
    const contact = await newContact.save();
    res.status(200).json({ contact });
  } catch (error) {
    res.status(404).json({ message: "Error add contact" });
  }
};

module.exports = addContact;
