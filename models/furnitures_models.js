import mongoose from "mongoose";

const furnituresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  modules_id: {
    type: String,
    required: true,
  },
  modules_number: {
    type: number,
    required: true,
  },
});

export default mongoose.model("Furnitures", furnituresSchema);
