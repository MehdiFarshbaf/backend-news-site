import Comment from "../models/commentModel.js";

export const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.findAll()
        res.status(200).json({
            success: true,
            comments,
            total: comments.length
        })
    } catch (err) {
        next(err)
    }
}

export const createComment = async (req, res, next) => {
    const {newsId, description, name, email, subject} = req.body
    try {
        const comment = await Comment.create({newsId, description, name, email, subject})

        res.status(201).json({
            success: true,
            message: "نظر ثبت شد و بعد تایید مدیران نمایش داده میشود.",
            comment
        })
    } catch (err) {
        next(err)
    }
}

export const updateComment = async (req, res, next) => {
    const {id} = req.params
    const {name, subject, description} = req.body
    try {
        const comment = await Comment.findByPk(id)
        if (!comment) {
            const error = new Error("کامنتی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }
        await Comment.update({name, subject, description}, {where: {id}})
        res.status(200).json({
            success: true,
            message: "ویرایش موفقیت آمیز بود."
        })
    } catch (err) {
        next(err)
    }
}
export const deleteComment = async (req, res, next) => {
    const {id} = req.params
    try {
        const comment = await Comment.findByPk(id)
        if (!comment) {
            const error = new Error("کامنتی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }
        await Comment.destroy({where: {id}})
        res.status(200).json({
            success: true,
            message: "حذف کامنت موفقیت آمیز بود."
        })
    } catch (err) {
        next(err)
    }
}