const { Contact } = require("../../schema/contactSchema");

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.find({ _id: req.params.contactId });
    res.status(200).json({
      contact,
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = getContactById;
