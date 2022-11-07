const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required:true,unique:false },
    desc: { type: String, required:false, },
    img: { type: String, required:false },
    categories: { type: Array },
    size: { type: String },
    color: { type: Array },
    price: { type: Number, required:false },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
