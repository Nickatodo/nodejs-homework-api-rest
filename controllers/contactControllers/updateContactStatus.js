const {
  Contact,
  updateStatusContactSchema,
} = require("../../schema/contactSchema");

const updateStatusContact = async (req, res) => {
  try {
    const { error } = updateStatusContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing field favorite",
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
          favorite: req.body.favorite,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ contact });
    } else {
      return res.status(400).json({
        message: "Contact not found",
      });
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = updateStatusContact;
