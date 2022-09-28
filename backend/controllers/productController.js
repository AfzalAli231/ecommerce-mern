const Product = require("../models/productModel.js");

const getAllProducts = () => {
  const products = Product.find();
  return products;
};
const getAllProductsBySlug = (slug) => {
  const products = Product.findOne({ slug: slug });
  return products;
};
const productBySellerId = (id) => {
  const products = Product.find({ sellerId: id });
  return products;
};
const createProduct = (body) => {
  const newProduct = new Product(body);

  try {
    const savedProduct = newProduct.save();
    return savedProduct;
  } catch (error) {
    console.log("Error!");
  }
};

const updateProduct = (body) => {
  const product = Product.findById(body.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.slug = req.body.slug || product.slug;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.sellerId = req.body.sellerId || product.sellerId;
    product.seller = req.body.seller || product.seller;
    product.sellerImage = req.body.sellerImage || product.sellerImage;

    const updateProduct = product.save();
    return updateProduct;
  }
};

const deleteProduct = (req) => {
  const data = Product.findByIdAndDelete(req.params.id);
  return data;
};
module.exports = {
  getAllProducts,
  getAllProductsBySlug,
  createProduct,
  productBySellerId,
  updateProduct,
  deleteProduct,
};
