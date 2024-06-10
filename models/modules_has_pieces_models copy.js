import mongoose from "mongoose";

const modulesHasPiecesSchema = new mongoose.Schema({
  module_id: {
    type: String,
    required: true,
  },
  piece_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ModulesHasPieces", modulesHasPiecesSchema);
