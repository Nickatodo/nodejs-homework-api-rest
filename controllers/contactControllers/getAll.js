const { Contact } = require("../../schema/contactSchema");

const listContacts = async (_, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error DB" });
  }
};

module.exports = listContacts;
