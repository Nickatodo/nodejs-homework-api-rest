const { Contact } = require("../../schema/contactSchema");

const listContacts = async (req, res) => {
  try {
    const conf = [
      {
        // Filtro Favoritos
        ...(req.query.favorite ? { favorite: req.query.favorite } : {}),
      },
      [],
      {
        // Paginacion
        ...(req.query.page ? { skip: req.query.page } : {}),
        ...(req.query.limit ? { limit: req.query.limit } : {}),
      },
    ];
    const contacts = await Contact.find(...conf);
    res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error DB" });
  }
};

module.exports = listContacts;
