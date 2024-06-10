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
  category: {
    type: String,
    required: true,
  },
  pieces_number: {
    type: number,
    required: true,
  },
});

export default mongoose.model("Modules", modulesSchema);
