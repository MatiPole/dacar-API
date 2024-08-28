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
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  dni: {
    type: String,
    required: false,
  },
  cuil_cuit: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  client_type: {
    type: String,
    required: false,
  },
  tag: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Clients", clientsSchema);
