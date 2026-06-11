const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,   //auto-manages createdAt and updatedAt
  }
);

//For searching 
noteSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Note", noteSchema);