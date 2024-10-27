import mongoose from "mongoose";

const furnituresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: false,
  },
  width: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  modules_furniture: {
    type: [Object],
    required: true,
  },
});

export default mongoose.model("Furnitures", furnituresSchema);
