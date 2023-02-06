import Product from "../models/product.js";
import dotenv from "dotenv";
import { dbConnect } from "../configs/dbConnect.js";
import products from "../data/products.js"; 

// setup env
dotenv.config({
    path: "../configs/config.env"
})

// Run data base connection
dbConnect()

const seedProducts = async () => {
    try{

        await Product.deleteMany();
        console.log("Product Deletes");

        await Product.insertMany(products);
        console.log("All products are added");

    }catch(error){
        console.log(error.message);
    }
}

seedProducts();
