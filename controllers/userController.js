import Users from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as path from "path";
import * as fs from "fs";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "fullName", "firstName", "lastName", "email", "isAdmin", "url"]
        })
        res.status(200).json({
            success: true,
            users
        })
    } catch (err) {
        next(err)
    }
}

export const registerUser = async (req, res, next) => {
    const {firstName, lastName, email, password, isAdmin} = req.body

    try {

        const findUser = await Users.findOne({where: {email}})
        if (findUser) {
            const error = new Error("کاربری با این ایمیل موجود است.")
            error.statusCode = 422
            throw error
        }

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        await Users.create({
            firstName, lastName, email, password: hashPassword, isAdmin
        })

        res.status(201).json({
            success: true,
            message: "کاربر با موفقیت ایجاد شد.",
        })
    } catch (err) {
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    const {email, password} = req.body

    try {
        const findUser = await Users.findOne({
            where: {email},
        })
        if (!findUser) {
            const error = new Error("کاربری با این ایمیل یافت نشد.")
            error.statusCode = 404
            throw error
        }

        const match = await bcrypt.compare(password, findUser.password)
        if (!match) {
            const error = new Error("گذرواژه یا ایمیل اشتباه است.")
            error.statusCode = 422
            throw error
        }

        const profile = {
            userId: findUser.id,
            fullName: findUser.fullName,
            email: findUser.email,
            isAdmin: findUser.isAdmin,
            firstName: findUser.firstName,
            lastName: findUser.lastName
        }

        const token = await jwt.sign(profile, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: "1h"
        })

        // set token in browser, expire at one day
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "خوش آمدید.",
            token,
            user: profile
        })

    } catch (err) {
        next(err)
    }

}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            success: true,
            message: "خروج موفقیت آمیز بود."
        })
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    const {id} = req.params
    // id type is string
    // userId type is number
    try {
        const user = await Users.findByPk(id)

        if (!user) {
            const error = new Error("کاربری با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }

        if (id == req.userId) {
            const error = new Error("شما نمیتوانید خودتان را حذف کنید!!!")
            error.statusCode = 422
            throw error
        }
        await Users.destroy({where: {id}})
        res.status(200).json({
            success: true,
            message: `${user.fullName} با موفقیت حذف شد.`
        })

    } catch (err) {
        next(err)
    }
}
export const editUser = async (req, res, next) => {
    const {id} = req.params
    const {email, firstName, lastName, isAdmin} = req.body
    try {
        const user = await Users.findByPk(id)
        if (!user) {
            const error = new Error("کاربری با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }
        await Users.update({email, firstName, lastName, isAdmin}, {where: {id}, returning: true})

        res.json({
            success: true,
            message: "کاربر با موفقیت ویرایش شد.",
        })
    } catch (err) {
        next(err)
    }
}
export const updateProfile = async (req, res, next) => {
    const id = req.userId
    try {
        const user = await Users.findByPk(id)
        if (!user) {
            const error = new Error("کاربری با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }

        let fileName = ""

        if (req.files === null) {
            fileName = user.image
            res.json(fileName)
        } else {
            const file = req.files.file
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            const dateNow = Math.round(Date.now())
            fileName = dateNow + ext
            const allowTypes = ['.png', '.jpg', '.jpeg']
            if (!allowTypes.includes(ext.toString())) {
                return res.status(422).json({
                    success: false, message: "فرمت عکس مجاز نیست"
                })
            }
            if (fileSize > 1000000) return res.status(422).json({
                success: false,
                message: "حجم عکس نباید بیشتر از یک مگابایت باشد."
            })

            if (user.image) {
                const filePath = `./public/profiles/${user.image}`
                fs.unlinkSync(filePath)
            }

            await file.mv(`./public/profiles/${fileName}`, err => {
                if (err) {
                    res.json({
                        success: false,
                        message: err.message
                    })
                }
            })
        }

        const {firstName, lastName} = req.body
        const url = `${req.protocol}://${req.get("host")}/profiles/${fileName}`
        await Users.update({firstName, lastName, image: fileName, url}, {where: {id}})

        res.json({
            success: true,
            message: "پروفایل شما با موفقیت ویرایش شد."
        })
    } catch (err) {
        next(err)
    }
}

export const getProfile = async (req, res, next) => {
    const id = req.userId
    try {
        const user = await Users.findByPk(id, {
            attributes: ["id", "fullName", "firstName", "lastName", "email", "isAdmin", "url"]
        })
        if (!user) {
            const error = new Error("کاربری با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            success: true,
            profile: user
        })
    } catch (err) {
        next(err)
    }
}