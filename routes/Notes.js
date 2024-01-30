const express = require("express");
const router = express.Router();
const { Notes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const note = req.body;
  const username = req.user.username;
  note.username = username;
  await Notes.create(note);
  res.json(note);
});

router.get("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  const notes = await Notes.findAll({ where: { ContactId: contactId } });
  res.json(notes);
});

router.delete("/:noteId", validateToken, async (req, res) => {
  const noteId = req.params.noteId;

  await Notes.destroy({
    where: {
      id: noteId,
    },
  });
  res.json("deleted success");
});

//Update Notes

router.put("/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const noteBody = req.body.noteBody;
  try {
    const note = await Notes.findByPk(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note cannot be found" });
    }
    note.noteBody = noteBody;
    await note.save();
    res.status(200).json({ message: "Note body updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
