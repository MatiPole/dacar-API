import mongoose from "mongoose";

const suppliesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: false,
    default: 0,
  },
  width: {
    type: Number,
    required: false,
    default: 0,
  },
  thickness: {
    type: Number,
    required: false,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  supplier_id: {
    type: Number,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Supplies", suppliesSchema);
