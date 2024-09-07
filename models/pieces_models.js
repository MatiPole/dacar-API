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
  qty: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  material: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    required: true,
  },
  edgeLength: {
    type: Boolean,
    required: false,
    default: false,
  },
  edgeLengthSides: {
    type: String,
    required: false,
  },
  edgeWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
  edgeWidthSides: {
    type: String,
    required: false,
  },
  lacqueredEdge: {
    type: Boolean,
    required: false,
    default: false,
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
  veneerLacqueredPieceSides: {
    type: String,
    required: false,
  },
  veneerLacqueredOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  veneer2: {
    type: Boolean,
    required: false,
    default: false,
  },
  veneer2Finishing: {
    type: String,
    required: false,
  },
  veneer2LacqueredPieceSides: {
    type: String,
    required: false,
  },
  veneer2LacqueredOpen: {
    type: Boolean,
    required: false,
    default: false,
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
  melamineLacqueredPieceSides: {
    type: String,
    required: false,
  },
  pantographed: {
    type: Boolean,
    required: false,
    default: false,
  },
  loose_piece: {
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
