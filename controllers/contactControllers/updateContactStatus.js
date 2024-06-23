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
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = updateStatusContact;
