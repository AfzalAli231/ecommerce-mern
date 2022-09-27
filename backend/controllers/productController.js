const Product = require("../models/productModel.js");

const productsAll = () => {
  const products = Product.find();
  return products;
};
const pbyslug = (slug) => {
  const products = Product.findOne({ slug: slug });
  return products;
};
const pbysellerid = (id) => {
  const products = Product.find({ sellerId: id });
  return products;
};
const createp = (body) => {
  const newProduct = new Product(body);

  try {
    const savedProduct = newProduct.save();
    return savedProduct;
  } catch (error) {
    console.log("Error!");
  }
};

const updatep = (body) => {
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

const delp = (req) => {
  const data = Product.findByIdAndDelete(req.params.id);
  return data;
};
module.exports = {
  productsAll,
  pbyslug,
  createp,
  pbysellerid,
  updatep,
  delp,
};