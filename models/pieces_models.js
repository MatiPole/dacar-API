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
    type: number,
    required: true,
  },
});

export default mongoose.model("Pieces", piecesSchema);
