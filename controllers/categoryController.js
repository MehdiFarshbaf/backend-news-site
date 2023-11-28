import Category from "../models/categoryModel.js";
import CategoryModel from "../models/categoryModel.js";

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
export const createCategory = async (req, res, next) => {
    const {name} = req.body
    try {
        await Category.create({name})
        res.status(201).json({
            success: true,
            message: `دسته بندی ${name} با موفقیت ایجاد شد.`,
        })
    } catch (err) {
        next(err)
    }
}

export const updateCategory = async (req, res, next) => {
    const {id} = req.params
    try {
        const category = await Category.findByPk(id)

        if (!category) {
            const error = new Error("دسته بندی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }

        await Category.update({name: req.body.name}, {where: {id}})
        res.status(200).json({
            success: true,
            message: "ویرایش دسته بندی موفقیت آمیز بود."
        })
    } catch (err) {
        next(err)
    }
}

export const deleteCategory = async (req, res, next) => {
    const {id} = req.params
    try {
        const category = await Category.findByPk(id)
        if (!category) {
            const error = new Error("دسته بندی با این شناسه یاقت نشد.")
            error.statusCode = 404
            throw error
        }
        await Category.destroy({where: {id}})
        res.status(200).json({
            success: true,
            message: `دسته بندی ${category?.name} با موفقیت حذف شد.`,
        })
    } catch (err) {
        next(err)
    }
}