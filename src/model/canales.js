import mongoose from "mongoose";

const canalesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id_workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export const canales = mongoose.model("Canales", canalesSchema);
