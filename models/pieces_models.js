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
  edge: {
    type: Number,
    required: true,
  },
  module_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Pieces", piecesSchema);
