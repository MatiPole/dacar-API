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
    type: Number,
    required: false,
  },
  edgeWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
  edgeWidthSides: {
    type: Number,
    required: false,
  },
  lacqueredEdge: {
    type: Boolean,
    required: false,
    default: false,
  },
  polishedEdge: {
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
    type: Number,
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
    type: Number,
    required: false,
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
    type: Number,
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
  melamineLacqueredPieceSides: {
    type: Number,
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
