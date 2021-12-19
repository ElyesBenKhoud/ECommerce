const Category = require("../models/categoryModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //if user have role = 1 --> means he is an admin
      //only admin can create,delete and update category
      const { name } = req.body;
      const category = await Category.find({ name });
      if (category)
        return res.status(400).json({ msg: "this category already exists" });

      const newCategory = new Category({ name });

      await newCategory.save();
      res.json({ msg: "created new category" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryCtrl;
