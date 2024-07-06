import mongoose from "mongoose";

const piecesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    required: true,
  },
  edge: {
    type: Object,
    required: false,
  },
  lacqueredPiece: {
    type: Boolean,
    required: false,
    default: false,
  },
  lacqueredPieceSides: {
    type: String,
    required: false,
  },
  veneer: {
    type: Boolean,
    required: false,
    default: false,
  },
  veneerFinishing: {
    type: String,
    required: false,
  },
  melamine: {
    type: Boolean,
    required: false,
    default: false,
  },
  melamineLacquered: {
    type: Boolean,
    required: false,
    default: false,
  },
  pantographed: {
    type: Boolean,
    required: false,
    default: false,
  },
  module_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Pieces", piecesSchema);
