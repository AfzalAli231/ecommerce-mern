const express = require( 'express')
const {
  getAllProducts,
  getAllProductsBySlug,
  productBySellerId,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");

const ProductRouter = express.Router();

//for fetch or get products = require( db
ProductRouter.get("/", async (req, res) => {

    const products = await getAllProducts();
    res.send(products);
});

//get product by slug
ProductRouter.get('/slug/:slug', async (req, res) => {
    const product = await getAllProductsBySlug(req.params.slug);
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
    
});

//get product by sellerId
ProductRouter.get('/seller/:id', async (req, res) => {
    const product = await productBySellerId(req.params.id);
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'No Product of the this Seller'});
    }
    
});

//create product
ProductRouter.post('/add', async(req, res) => {
    const newProduct = createProduct(req.body);
        res.status(200).json(newProduct);
});


//for update product
ProductRouter.put("/update", async(req, res) => {
    const updatedProduct = await updateProduct(req.body);

       if (updatedProduct) {
         res.send({
           _id: updatedProduct._id,
           name: updatedProduct.name,
           slug: updatedProduct.slug,
           category: updatedProduct.category,
           description: updatedProduct.description,
           price: updatedProduct.price,
           image: updatedProduct.image,
           sellerId: updatedProduct.sellerId,
           seller: updatedProduct.seller,
           sellerImage: updatedProduct.sellerImage,
         });
       } else {
         res.status(401).send({ message: "Product not Found!" });
       }
});

ProductRouter.delete("/delete/:id", async(req, res) => {

    try{

        await deleteProduct(req);
        res.status(200).json("Product has been deleted!");


    } catch(error) {
        console.log("Can't be deleted!");
    }

});




module.exports = ProductRouter;
