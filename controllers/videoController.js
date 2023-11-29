import * as path from "path";
import Video from "../models/videoModel.js";
import * as fs from "fs";

export const getAllVideos = async (req, res, next) => {
    try {
        const videos = await Video.findAll()
        res.status(200).json({
            success: true,
            videos
        })
    } catch (err) {
        next(err)
    }
}

export const getSingleVideo = async (req, res, next) => {
    try {
        const video = await Video.findOne({order: [["createdAt", "DESC"]]})
        res.status(200).json({
            success: true,
            video
        })
    } catch (err) {
        next(err)
    }
}

export const deleteVideo = async (req, res, next) => {
    const {id} = req.params
    try {
        const video = await Video.findByPk(id)
        if (!video) {
            const error = new Error("ویدیویی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }

        const filePath = `./public/videos/${video.video}`
        fs.unlinkSync(filePath)
        await Video.destroy({where: {id}})
        res.status(200).json({
            success: true,
            message: "ویدیو با موفقیت حذف شد."
        })

    } catch (err) {
        next(err)
    }
}
export const createVideo = async (req, res, next) => {
    try {
        if (req.files == null) return res.status(422).json({
            success: false,
            message: "انتخاب ویدیو الزامی است."
        })

        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        const dateNow = Math.round(Date.now())
        const fileName = dateNow + ext
        const url = `${req.protocol}://${req.get("host")}/videos/${fileName}`
        const allowType = ['.mp4']

        if (!allowType.includes(ext.toLowerCase())) return res.status(422).json({
            success: false,
            message: "فرمت ویدیو نا معتبر است."
        })

        if (fileSize > 5000000) return res.status(422).json({
            success: false,
            message: "حجم ویدیو نباید بیشتر از 5 مگابایت باشد."
        })

        await file.mv(`./public/videos/${fileName}`, async (err) => {
            if (err) return res.status(422).json({
                success: false,
                message: err.message
            })
            await Video.create({
                url,
                video: fileName
            })
            res.status(200).json({
                success: true,
                message: "ویدیو به موفقیت افزوده شد."
            })
        })

    } catch (err) {
        next(err)
    }
}