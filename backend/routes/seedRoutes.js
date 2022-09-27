const express = require('express')
const data = require('../data.js');
const Category = require('../models/categoryModel.js');
const Product = require('../models/productModel.js');
const User = require('../models/userModel.js');


//Seed data into table -> db

const seedRouter = express.Router();

seedRouter.get("/", async(req, res) => {

    await User.remove({});
    const createdUser = await User.insertMany(data.users);

    await Product.remove({});
    const createdProduct = await Product.insertMany(data.products);

    await Category.remove({});
    const createdCategory = await Category.insertMany(data.category);

    res.send({createdUser, createdProduct, createdCategory});

});

module.exports = seedRouter;