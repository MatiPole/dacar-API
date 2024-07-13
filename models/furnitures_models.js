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
  height: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  modules_furniture: {
    type: [Object],
    required: true,
  },
});

export default mongoose.model("Furnitures", furnituresSchema);
