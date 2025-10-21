import mongoose from "mongoose";

const workspaceMenbersSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // referencia al modelo User
    required: true,
  },
  id_workspace: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Workspace", //referencia al modelo Workspace
  },
  role: {
    type: String,
    default: "USER",
  },
  created_at: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

export const workspaceMembers = mongoose.model(
  "WorkspaceMembers",
  workspaceMenbersSchema
);
