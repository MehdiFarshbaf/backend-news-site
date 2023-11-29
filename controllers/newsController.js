import News from "../models/newsModel.js";
import * as path from "path";
import fs from "fs";

export const getAllNews = async (req, res, next) => {
    try {
        const news = await News.findAll()
        res.status(200).json({
            success: true,
            news
        })
    } catch (err) {
        next(err)
    }
}

export const createNews = async (req, res, next) => {
    const userId = req.userId
    try {
        if (req.files == null) return res.status(422).json({
            success: false,
            message: "انتخاب تصویر الزامی است."
        })
        const {title, desc, catId} = req.body
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        const dateNow = Math.round(Date.now())
        const fileName = dateNow + ext
        const url = `${req.protocol}://${req.get("host")}/news/${fileName}`
        const allowTypes = ['.jpg', '.jpeg', '.png']
        if (!allowTypes.includes(ext.toLowerCase())) {
            res.status(422).json({
                success: false,
                message: "فرمت عکس مجاز نیست."
            })
        }
        if (fileSize > 2000000) {
            res.status(422).json({
                success: false,
                message: "حجم تصویر نباید بیشتر از 2 مگابایت باشد."
            })
        }

        await file.mv(`./public/news/${fileName}`, async (err) => {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                })
            }
            await News.create({
                title, desc, userId, catId, image: fileName, url
            })
            res.status(201).json({
                success: true,
                message: "اخبار جدید با موفقیت ثبت شد."
            })
        })
    } catch (err) {
        next(err)
    }
}

export const getNews = async (req, res, next) => {
    const {id} = req.params
    try {
        const news = await News.findByPk(id)
        if (!news) {
            const error = new Error("خبری با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            news
        })
    } catch (err) {
        next(err)
    }
}

export const updateNews = async (req, res, next) => {
    const userId = req.userId
    const {id} = req.params
    const {title, desc, catId} = req.body
    try {
        let fileName = ""
        const news = await News.findByPk(id)
        if (!news) {
            const error = new Error("خیری با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }
        if (req.files === null) {
            fileName = news.image
        } else {
            const file = req.files.file
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            const dateNow = Math.round(Date.now())
            fileName = dateNow + ext
            const allowTypes = ['.jpg', '.jpeg', '.png']
            if (!allowTypes.includes(ext.toLowerCase())) {
                res.status(422).json({
                    success: false,
                    message: "فرمت عکس مجاز نیست."
                })
            }
            if (fileSize > 2000000) {
                res.status(422).json({
                    success: false,
                    message: "حجم تصویر نباید بیشتر از 2 مگابایت باشد."
                })
            }

            const filePath = `./public/news/${news.image}`
            fs.unlinkSync(filePath)

            await file.mv(`./public/news/${fileName}`, async (err) => {
                console.log("enter async")
                if (err) {
                    res.status(422).json({
                        success: false,
                        message: err.message
                    })
                }
            })
        }

        const url = `${req.protocol}://${req.get("host")}/news/${fileName}`

        await News.update({
            title, desc, userId, catId, image: fileName, url
        }, {
            where: {id}
        })
        res.status(201).json({
            success: true,
            message: "ویرایش با موفقیت ثبت شد."
        })

    } catch (err) {
        next(err)
    }
}

export const deleteNews = async (req, res, next) => {

    const {id} = req.params

    try {
        const news = await News.findByPk(id)
        if (!news) {
            const error = new Error("خبری با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }

        const filePath = `./public/news/${news.image}`
        fs.unlinkSync(filePath)

        await News.destroy({where: {id}})
        res.status(200).json({
            success: true,
            message: `پست ${news.title} با موفقیت حذف شد.`
        })

    } catch (err) {
        next(err)
    }
}