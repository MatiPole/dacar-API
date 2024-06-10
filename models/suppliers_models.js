import mongoose from "mongoose";

const suppliersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  cuil_cuit: {
    type: String,
    required: true,
  },
  email: {
    type: Number,
    required: false,
  },
  tag: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Suppliers", suppliersSchema);
