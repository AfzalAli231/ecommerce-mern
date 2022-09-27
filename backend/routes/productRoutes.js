const express = require( 'express')
const {
  productsAll,
  pbyslug,
  pbysellerid,
  createp,
  updatep,
  delp} = require( "../controllers/productController.js");

const ProductRouter = express.Router();

//for fetch or get products = require( db
ProductRouter.get("/", async (req, res) => {

    const products = await productsAll();
    res.send(products);
});

//get product by slug
ProductRouter.get('/slug/:slug', async (req, res) => {
    const product = await pbyslug(req.params.slug);
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
    
});

//get product by sellerId
ProductRouter.get('/seller/:id', async (req, res) => {
    const product = await pbysellerid(req.params.id);
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'No Product of the this Seller'});
    }
    
});

//create product
ProductRouter.post('/add', async(req, res) => {
    const newProduct = createp(req.body);
        res.status(200).json(newProduct);
});


//for update product
ProductRouter.put("/update", async(req, res) => {
    const updateProduct = await updatep(req.body);

       if (updateProduct) {
         res.send({
           _id: updateProduct._id,
           name: updateProduct.name,
           slug: updateProduct.slug,
           category: updateProduct.category,
           description: updateProduct.description,
           price: updateProduct.price,
           image: updateProduct.image,
           sellerId: updateProduct.sellerId,
           seller: updateProduct.seller,
           sellerImage: updateProduct.sellerImage,
         });
       } else {
         res.status(401).send({ message: "Product not Found!" });
       }
});

ProductRouter.delete("/delete/:id", async(req, res) => {

    try{

        await delp(req);
        res.status(200).json("Product has been deleted!");


    } catch(error) {
        console.log("Can't be deleted!");
    }

});




module.exports = ProductRouter;