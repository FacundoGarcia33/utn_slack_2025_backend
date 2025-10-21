import mongoose from "mongoose";

const Mensajes = new mongoose.Schema({
  id_canal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Canales",
    required: true,
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const canalesMensajes = mongoose.model("CanalesMensajes", Mensajes);
