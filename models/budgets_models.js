import mongoose from "mongoose";

const budgetsSchema = new mongoose.Schema({
  budget_number: {
    type: String,
    required: true,
  },
  furniture_name: {
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
  materials: {
    type: Array,
    required: true,
  },
  furniture: {
    type: [Object],
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  total_price: {
    type: Number,
    required: true,
  },
  date: {
    type: string,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Budgets", budgetsSchema);
