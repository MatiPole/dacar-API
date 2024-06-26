import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
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
  cuil_cuit: {
    type: String,
    required: true,
  },
  email: {
    type: Number,
    required: false,
  },
  client_type: {
    type: String,
    required: true,
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
export default mongoose.model("Clients", clientsSchema);
