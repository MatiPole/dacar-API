import mongoose from "mongoose";

const budgetsSchema = new mongoose.Schema({
  budget_number: {
    type: Number,
    required: true,
  },
  furniture_name: {
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
  furniture: {
    type: [Object],
    required: true,
  },
  veneer: {
    type: [Object],
    required: false,
  },
  veneerPolished: {
    type: [Object],
    required: false,
  },
  chapa: {
    type: [Object],
    required: false,
  },
  lacqueredOpen: {
    type: [Object],
    required: false,
  },
  lacquered: {
    type: [Object],
    required: false,
  },
  pantographed: {
    type: [Object],
    required: false,
  },
  edge_lacquered: {
    type: [Object],
    required: false,
  },
  edge_polished: {
    type: [Object],
    required: false,
  },
  edge_no_lacquered: {
    type: [Object],
    required: false,
  },
  supplies: {
    type: [Object],
    required: false,
  },
  materials: {
    type: [Object],
    required: true,
  },
  extra_items: {
    type: [Object],
    required: false,
  },
  adjustment_reason: {
    type: String,
    required: false,
  },
  adjustment_price: {
    type: String,
    required: false,
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
    type: Date,
    default: Date.now,
  },
  deliver_date: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  client: {
    type: [Object],
    required: true,
  },
  placement: {
    type: Boolean,
    required: false,
  },
  placement_price: {
    type: Number,
    required: false,
  },
  placement_days: {
    type: String,
    required: false,
  },
  shipment: {
    type: Boolean,
    required: false,
  },
  shipment_price: {
    type: Number,
    required: false,
  },
  show_modules: {
    type: Boolean,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Budgets", budgetsSchema);
