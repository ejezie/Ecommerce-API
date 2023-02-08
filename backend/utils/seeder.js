import Product from "../models/product.js";
import { dbConnect } from "../configs/dbConnect.js";
import products from "../data/products.json" assert {type: "json"}; 

// Run data base connection
dbConnect()

const seedProducts = async () => {
    try{

        await Product.deleteMany();
        console.log("Product Deletes");

        await Product.insertMany(products);
        console.log("All products are added");

        process.exit();

    }catch(error){
        console.log(error.message);
    }
}

seedProducts();
