const express = require( 'express');
const { getAllCategories } = require("../controllers/categoryController.js");

const CategoryRouter = express.Router();

//for fetch or get category = require( db
CategoryRouter.get("/", async (req, res) => {

    const category = await getAllCategories();
    res.send(category);
});

module.exports = CategoryRouter;
