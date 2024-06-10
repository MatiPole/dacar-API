import mongoose from "mongoose";

const furnituresHasModulesSchema = new mongoose.Schema({
  furniture_id: {
    type: String,
    required: true,
  },
  module_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "FurnituresHasModules",
  furnituresHasModulesSchema
);
