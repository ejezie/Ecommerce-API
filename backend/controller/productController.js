import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFeatures from "../utils/apiFeatures.js";

// New Product, Route to => api/v1/admin/product/new POST
export const newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    message: "Product Created",
    success: true,
    data: product,
  });
});

// Get all Products, Route to => api/v1/products?keyword=apple GET
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
  .search()
  .filter()

  const products = await apiFeatures;
  res.status(200).json({
    message: "All Products",
    success: true,
    count: products.length,
    products,
  });
});

// Get all single Product, Route to => api/v1/product/:id GET
export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    message: "Product Found",
    success: true,
    product,
  });
});

// Update a Product, Route to => api/v1/admin/product/:id PUT
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    message: "Product Updated",
    success: true,
    product,
  });
});

// Delete roduct, Route to => api/v1/admin/product/:id DELETE
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    message: "Product Deleted",
    success: true,
    product,
  });
});
