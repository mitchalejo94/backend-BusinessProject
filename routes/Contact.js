const express = require("express");
const router = express.Router();
const { Contact } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//Routers
//GET All = main user
router.get("/", validateToken, async (req, res) => {
  try {
    const contactList = await Contact.findAll();
    res.json(contactList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get by id//
router.get("/:contactId", validateToken, async (req, res) => {
  try {
    const id = req.params.contactId;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//POST - anyone
router.post("/", async (req, res) => {
  try {
    const commentPost = req.body;
    await Contact.create(commentPost);
    res.json(commentPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete Contact Route

router.delete("/:contactId", validateToken, async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await contact.destroy();
    res.json("deleted success");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//Route to toggle activeContact statush
router.post("/activeContact/:contactId", validateToken, async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Update the activeProject attribute of the contact
    await contact.update({ activeContact: !contact.activeContact });

    res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
