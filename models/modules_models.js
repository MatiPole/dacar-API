import mongoose from "mongoose";

// nombre, medida, categoria, material, cantidad de piezas, precio

const modulesSchema = new mongoose.Schema({
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
  height: {
    type: Number,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  pieces_number: {
    type: Number,
    required: true,
  },
  supplies_module: {
    type: Object,
    required: false,
  },
});

export default mongoose.model("Modules", modulesSchema);
