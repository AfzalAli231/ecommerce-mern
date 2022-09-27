const Category = require("../models/categoryModel.js");

const getAllCats = () => {
  const category = Category.find();
  return category;
};

module.exports = {
    getAllCats
}