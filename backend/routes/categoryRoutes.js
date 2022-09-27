const express = require( 'express');
const { getAllCats } = require( "../controllers/categoryController.js");

const CategoryRouter = express.Router();

//for fetch or get category = require( db
CategoryRouter.get("/", async (req, res) => {

    const category = await getAllCats();
    res.send(category);
});

module.exports = CategoryRouter;