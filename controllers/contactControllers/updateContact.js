const { Contact, updateContactSchema } = require("../../schema/contactSchema");

const updateContact = async (req, res) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
    const contacts = await Contact.find({
      ...(req.user ? { owner: req.user } : {}),
    });
    const idExists = contacts.some((contac) =>
      contac._id.equals(req.params.contactId)
    );
    if (idExists) {
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
    } else {
      return res.status(400).json({
        message: "contact not found",
      });
    }
  } catch (error) {
    res.status(400).json({ error: "Contact not updated" });
  }
};

module.exports = updateContact;
