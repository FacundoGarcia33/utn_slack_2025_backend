import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  url_image: {
    type: String,
    required: true,
  },
});

export const Workspace = mongoose.model("Workspace", workspaceSchema);
