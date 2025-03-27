import Category from "../../models/Category.js";

export default async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(200).json(error);
  }
}
