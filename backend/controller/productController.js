import Product from "../models/product.js"

// New Product, Route to => api/v1/product/new
export const newProduct = async (req, res, next) => {

     const product = await Product.create(req.body);
     
}


export const getAllProducts = (req, res, next) => {
    res.status(200).json({
        message: 'All Products',
        success: true,
    });
}