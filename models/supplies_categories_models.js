import mongoose from "mongoose";

const suppliersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Suppliers", suppliersSchema);
