const Category = require("../models/categoryModel.js");

const getAllCategories = () => {
  const category = Category.find();
  return category;
};

module.exports = {
    getAllCategories
}