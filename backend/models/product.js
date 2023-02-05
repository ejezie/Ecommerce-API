import mongoose from "mongoose";

const {Schema, model} = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name must be at least 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    maxlength: [5, "Product price must be at least 100 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    minlength: [30, "Product description must be at least 30 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: {
      values: [
        "Electronics",
        "Furniture",
        "Clothes/Shoes",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Sports",
        "Outdoors",
        "Home",
        "Beauty/Health ",
      ],
      message: "Please select a valid category",
    },
  },
  seller: {
    type: String,
    required: [true, "Product seller is required"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    maxLength: [5, "Product stock must be at most 10 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Product", productSchema);
