import mongoose from "mongoose";

const suppliesCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("SuppliesCategories", suppliesCategoriesSchema);
