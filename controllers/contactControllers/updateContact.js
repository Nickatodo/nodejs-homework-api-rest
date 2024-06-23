const { Contact, updateContactSchema } = require("../../schema/contactSchema");

const updateContact = async (req, res) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      {
        _id: req.params.contactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: req.body.favorite,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ contact });
  } catch (error) {
    res.status(400).json({ error: "Contact not updated" });
  }
};

module.exports = updateContact;
