const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    trim: true,
    require: true,
  },
  title: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  price: {
    type: Number,
    trim: true,
    require: true,
  },
  describtion: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  images: {
    type: Object,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  sold: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("products", productSchema);
