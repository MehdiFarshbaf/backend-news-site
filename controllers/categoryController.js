import Category from "../models/categoryModel.js";

export const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json({
            success: true,
            categories
        })
    } catch (err) {
        next(err)
    }
}