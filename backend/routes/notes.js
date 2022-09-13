const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes Using: GET "/api/auth", requires Login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE 2: Add a new note using POST, requires Login
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title cannot be less than 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description cannot be less than 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// ROUTE 3: Update an existing note using PUT, requires Login
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //Create a new Note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Check if the user trying to update the note is the same as the current user
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // Find the note to be updated
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
    // const note = Note.findByIdAndUpdate()
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

// ROUTE 4: Delete a note using DELETE, requires login
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

module.exports = router;
