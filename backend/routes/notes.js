const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

//GET /api/notes - get all notes
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && search.trim() !== "") {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    const notes = await Note.find(query).sort({ pinned: -1, updatedAt: -1 });
    res.json({ success: true, count: notes.length, data: notes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

//GET /api/notes/:id - get single note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

//POST /api/notes - create a note
router.post("/", async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const note = await Note.create({ title: title.trim(), content, tags });
    res.status(201).json({ success: true, data: note });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

//PUT /api/notes/:id - update a note
router.put("/:id", async (req, res) => {
  try {
    const { title, content, tags, pinned } = req.body;

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ success: false, message: "Title cannot be empty" });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, pinned },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

//DELETE /api/notes/:id - delete a note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

module.exports = router;