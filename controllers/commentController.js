import Comment from "../models/commentModel.js";

export const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.findAll()
        res.status(200).json({
            success: true,
            comments
        })
    } catch (err) {
        next(err)
    }
}